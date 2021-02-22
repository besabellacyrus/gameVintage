// import logo from './logo.svg';
import './App.css';
import './assets/css/main.scss';
import './assets/common/scss/main.scss'
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";
import React, { useEffect, useState, Suspense } from 'react';
import queryString from 'query-string';
import useApi from './api';
import { Home } from './components/Home';
import ErrorPopUp from './components/ErrorPopUp';

const App = () => {
  const location = useLocation();
  const urlParams = queryString.parse(location.search);
  const USERNUM = urlParams.SESSIONID;
  const USERID = urlParams.USERID;
  const SESSIONID = urlParams.SESSIONID;
  const GAMEID = urlParams.GAMEID;
  const api = useApi();
  const [numberRounds, setNumberRounds] = useState([]);
  const [gameNumbers, setGameNumbers] = useState([]);
  const [spinData, setSpinData] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [errorContent, setErrorContent] = useState({});

  // const [next, setNext] = useState(1);
  const [gameState, setGameState] = useState({
    isGamePlaying: false,
    currentRound: -1,
    ACCOUNTVALUE: 0,
    DRAWS: 1,
  });

  useEffect(() => {
    initializeGame();
  },[])

  useEffect(() => {
    console.log({ theError: errorState });
  },[errorState])

  const initializeGame = async () => {
    const game = await api.gameLogin({USERNUM, USERID, CONFIGID: 24 });
    const config = await api.getConfig({
        GAMEID: game.GAMEID,
        USERNUM,
        USERID
    });

    setGameState({
      ...gameState,
      ...config,
      ...game,
      USERNUM,
      USERID,
    });

    console.log({ config, gameState, game })
    getGameCounterData(game);
  }

  const getAndFollowGameState = async (game, next) => {
    const gamestate = await api.getState({
        GAMEID: game.GAMEID,
        GAMETYPE: 'SL',
        CONFIGID: '24',
        USERNUM,
        USERID,
        TRANTYPE: 'GETSTATE'
      }, next);

      console.warn({ thegame: game })
    console.log({ gggg: gamestate, next })
    if (gamestate['AC'+next]) {
      switch (gamestate['AC'+next]) {
        case 'SPIN':
          try {
            const spin  = await api.casinoServlet({
                BETLINES: gamestate.BETLINES,
                USERNUM: USERNUM,
                GAMETYPE: 'SL',
                DENOM: gamestate.DENOM,
                USERID: USERID,
                GAMEID: game.GAMEID,
                TRANTYPE: 'SPIN',
                BET: gamestate.BET,
                LASTWAGERTYPE: gamestate.WAGERTYPE
            })

              console.log({ spin })
              if (spin.WON) {
                setSpinData(spin)
                getAndFollowGameState(game, next + 1)
              }
          } catch (error) {
            console.log({ error })
          }
          break;
        case 'WIN':
        case 'LOSE':
          getAndFollowGameState(game, next + 1)
          break;
        default:
          console.log({ default: gamestate })
          break;
      }
    } else {
      // send to client
    }
  }

  const getGameCounterData = async (game) => {
    const gameCounter = await api.getGameCounter({
      GAMEID: game.GAMEID,
      USERNUM,
      USERID,
    });

    if (gameCounter['ERROR']) {
      showError(gameCounter)
      return;
    }

    console.log({ gameCounter })

    getAndFollowGameState(game, 1);
  }

  const showError = (data) => {
      console.log({ gameCounterError: data })
      const err = {
        errorTitle: data.ERROR,
        errorContent: data.RETRESNAME
      }

      setErrorContent(err)
      setErrorState(true);
  }

  const processError = (data) => {

      console.log({ processError: data })

      setErrorContent(data)
      setErrorState(true);

  }



  return (
    <main>
      <ErrorPopUp hasError={errorState} { ...errorContent }></ErrorPopUp>
      <Home gameState={gameState} spinData={spinData} processError={processError}></Home>
    </main>
  );
}

export default App;
