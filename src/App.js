// import logo from './logo.svg';
import './App.css';
import './assets/common/scss/main.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useLocation
} from "react-router-dom";
import React, { Component, useEffect } from 'react';
import queryString from 'query-string';
import qs from 'querystring';
import axios from 'axios'; 
import { Home } from './components/Home';
const {
  REACT_APP_API_BASE_URL
} = process.env;

const App = () => {
  const location = useLocation();
  let history = useHistory();
  const language = 'en';
  const userId = 'BPK35058560571';
  const gameId = 'SL24';
  const launcher = 'PARLAY2';
  const mobile = 'no';
  const passThrough = `{"helpUrl":"https:bpkdev.parlaygames.nethow-to-play#videoslots?param1=TTT3","homeURL":"https:bpkdev.parlaygames.net"}`
  const API_URL = 'gameserver/CasinoServlet';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  useEffect(() => {
    
    const payloadParams = `/GameLaunchServlet?LANGUAGE=${language}&USERID=${userId}&MOBILE=${mobile}&GAMEID=${gameId}&LAUNCHER=${launcher}&PASSTHROUGH=${passThrough}`;
    history.push({
      search: payloadParams
    });
    axios.post(REACT_APP_API_BASE_URL+ payloadParams, 
      queryString.stringify({
        USERNUM: '5782518ECBF5D2CB0B55584F09421866',
        CONFIGID: 24,
        TRANTYPE: 'GAMELOGIN',
        USERID: 'BPK35058560571',
        GAMETYPE: 'SL',
        VERSION: 'FLASH'
      }) , { headers }).then(res => {
        const config = res.config.data.split('&');
        let configs = {}
        config.forEach((e, i)=> {
          const www = e.split("=")
          configs[www[0]] = www[1]
          console.log({ www })
        })
      // console.log({ configs, res })
      if (configs !== {}) {
        getConfig(configs);
      }
    }).catch(err => {
      console.log({ err })
    });
  }, []);

  const getConfig = (payload) => {
    console.log({ payload });
    axios.post(REACT_APP_API_BASE_URL+ '/CasinoServlet', 
      queryString.stringify({
        USERNUM: payload.USERNUM,
        CONFIGID: payload.CONFIGID,
        TRANTYPE: 'GETCONFIG',
        USERID: payload.USERID,
        GAMETYPE: payload.GAMETYPE,
        VERSION: payload.VERSION
      }) , { headers }).then(res => {
         console.log({ getConfig: res })
    }).catch(err => {
      console.log({ err })
    });
  }

  const urlParams = queryString.parse(location.search);
  console.log({ urlParams, location, history })

  return ( 
    <main>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
    </main>
  );
}

export default App;
