import {
    startGame,
    casinoServlet,
    gameLogin,
    getState,
    getConfig,
    start,
    getGameCounter, 
} from './game.js';

const useApi = () => {
    return {
        startGame,
        start,
        casinoServlet,
        gameLogin,
        getConfig,
        getState,
        getGameCounter
    };
};

export default useApi;
