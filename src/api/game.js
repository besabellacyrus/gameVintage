import axios from 'axios';
import qs from 'querystring';
import { parseResponse, prepPayload } from '../utils/api-communication';

const {
    REACT_APP_API_BASE_URL
} = process.env;

let previousResponse = {};
let NEXT = 1;

export const startGame = async (urlParams) => {
    return await axios.post(`${REACT_APP_API_BASE_URL}/gameserver/GameLaunchServlet?LANGUAGE=en&USERID=${urlParams.USERID}&SESSIONID=${urlParams.SESSIONID}&GAMEID=SL24&LAUNCHER=PARLAY2&MOBILE=false`,
        qs.stringify({
            LANGUAGE: urlParams.LANGUAGE,
            USERID: urlParams.USERID,
            SESSIONID: urlParams.SESSIONID,
            GAMEID: 'SL24',
            LAUNCHER: 'PARLAY2',
            MOBILE: false
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
};

const basic = async ({ GAMEID, USERNUM, USERID, TRANTYPE }) => {
    const params = {
        GAMETYPE: 'SL',
        CONFIGID: 24,
        TRANTYPE,
        GAMEID,
        USERNUM,
        USERID,
    };

    return sendCasinoServlet(params);
}

const sendCasinoServlet = async (params) => {
    const response = await axios.post(
        `${REACT_APP_API_BASE_URL}/gameserver/CasinoServlet`,
        qs.stringify(params),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );

    return parseResponse(response.data);
}

export const casinoServlet = async (params, next) => {
    if(params.TRANTYPE === 'GETSTATE') {
        params = {
            ...params,
            NEXT
        };

        NEXT++;
    } else if (params.TRANTYPE === 'BUYTICKETS') {
        params = {
            ...params,
            NEXT: next - 1
        };
    }

    const response = await axios.post(
        `${REACT_APP_API_BASE_URL}/gameserver/CasinoServlet`,
        qs.stringify(params),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
  
    

    const data = parseResponse(response.data);

    previousResponse = data;

    return data;
};


export const getState = async (params, next) => {
    const response = await axios.post(
        `${REACT_APP_API_BASE_URL}/gameserver/CasinoServlet`,
        qs.stringify({
            ...params,
            NEXT: next
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );

    const data = parseResponse(response.data);

    previousResponse = data;
    return data;
}

export const gameLogin = async (params) => {
    return basic({
        ...params,
        TRANTYPE: 'GAMELOGIN'
    });
}
 
export const getConfig = async (params) => {
    return basic({
        ...params,
        TRANTYPE: 'GETCONFIG'
    });
}

export const start = async (params) => {
    return basic({
        ...params,
        TRANTYPE: 'START'
    });
}

export const getGameCounter = async (params) => {
    return basic({
        ...params,
        TRANTYPE: 'GETGAMECOUNTER',
    });
}

export const spin = async (params) => {
    const spin  = await casinoServlet(params)
    console.log({ spinnnn: params, spin })
}