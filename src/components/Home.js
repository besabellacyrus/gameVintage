import React, { useState, useEffect, useRef } from 'react';
import useApi from '../api';
import useSound from 'use-sound';
import { Header } from './Header';
import slotSounds from '../assets/sounds/slotSounds.mp3';

const spriteMap = {
    ambient: [
      0,
      8124.081632653061
    ],
    BackgroundSound2: [
      10000,
      9273.4693877551
    ],
    backgroundsound3: [
      21000,
      8124.081632653059
    ],
    betmax: [
      31000,
      940.4081632653067
    ],
    chgBetPerLine: [
      33000,
      313.4693877550987
    ],
    Cost: [
      35000,
      313.4693877550987
    ],
    reelStart: [
      55000,
      653.0612244897966
    ],
    seepays: [
      59000,
      287.34693877551365
    ],
    win: [
      61000,
      1071.020408163264
    ],
    Line1: [
      37000,
      391.83673469387514
    ],
    Line2: [
      39000,
      365.714285714283
    ],
    Line3: [
      41000,
      391.83673469387514
    ],
    Line4: [
      43000,
      391.83673469387514
    ],
    Line5: [
      45000,
      391.83673469387514
    ],
};


export const Home = ({ gameState, spinData }) => {
    const [gamestate, setgamestate] = useState({})
    const [wheelZero, setwheelZero] = useState([])
    const [wheelOne, setwheelOne] = useState([])
    const [wheelTwo, setwheelTwo] = useState([])
    const [denoms, setdenoms] = useState([]);
    const [spinning, setspinning] = useState(false);
    const [selectedDenom, setselecteddenom] = useState("");
    const [loading, setloading] = useState(true);
    const [play, { pause, stop, isPlaying } ] = useSound(slotSounds, {
      sprite: spriteMap
    });


    const myStyle1 = {
        transform: 'rotateX(30deg) translateZ(200px)'
    }
    const myStyle2 = {
        transform: 'rotateX(60deg) translateZ(200px)'
    }
    const myStyle3 = {
        transform: 'rotateX(90deg) translateZ(200px)'
    }
    const myStyle4 = {
        transform: 'rotateX(120deg) translateZ(200px)'
    }
    const myStyle5 = {
        transform: 'rotateX(150deg) translateZ(200px)'
    }
    const myStyle6 = {
        transform: 'rotateX(180deg) translateZ(200px)'
    }
    const myStyle7 = {
        transform: 'rotateX(210deg) translateZ(200px)'
    }
    const myStyle8 = {
        transform: 'rotateX(240deg) translateZ(200px)'
    }
    const myStyle9 = {
        transform: 'rotateX(270deg) translateZ(200px)'
    }
    const myStyle10 = {
        transform: 'rotateX(300deg) translateZ(200px)'
    }
    const myStyle11 = {
        transform: 'rotateX(330deg) translateZ(200px)'
    }
    const myStyle12 = {
        transform: 'rotateX(360deg) translateZ(200px)'
    }

    // const oneRef = useRef(null);
    // const twoRef = useRef(null);
    // const threeRef = useRef(null);

    const ringOne = useRef(null);
    const ringTwo = useRef(null);
    const ringThree = useRef(null);

    const api = useApi();

    useEffect(() => {
        setloading(false);
    }, [])

    useEffect(() => {
        const spinWheels = spinData.WHEELVALUES
        const wheelZero = spinData.WHEEL0
        const wheelOne = spinData.WHEEL1
        const wheelTwo = spinData.WHEEL2

        setReels({
            wheels: spinWheels,
            wheelZero,
            wheelOne,
            wheelTwo,
            won: spinData.WON
        })
        console.log({ spinWheels, spinData })
        if (wheelTwo) {
            if (spinData.WHEELVALUES) {
                setTimeout(() => {
                    setloading(true);
                }, 1000);
            }
        }
    }, [spinData])

    useEffect(() => {
        if (gameState.DENOM) {
            const gameDenoms = gameState.DENOM.split(',');
            setdenoms(gameDenoms)
            setselecteddenom(gameDenoms[0])
        }
        console.log({ gameState2232: gameState })
        setgamestate(gameState)
    }, [gameState])


    const getWheelChunk = (data) => {
        let i,j,temparray,chunk = 3;
        let wheelsChunks = []
        for (i=0,j=data.length; i<j; i+=chunk) {
            temparray = data.slice(i,i+chunk);
            wheelsChunks.push(temparray)
        }
        console.log({ wheelsChunks })
        return wheelsChunks
    }

    const handleBetLine = (betline = 0) => {
        let paylines = gamestate.NUMPAYLINES
        if (betline === 5) {
            paylines = betline
        } else {
            if (paylines < 5) {
                paylines ++
            } else {
                paylines = 1
            }
        }
        console.log({ paylines})
        const b0 = document.getElementById('payline-0');
        const b1 = document.getElementById('payline-1');
        const b2 = document.getElementById('payline-2');
        const b3 = document.getElementById('payline-3');
        const b4 = document.getElementById('payline-4');

        b0.lastChild.style.strokeWidth = 3
        b1.lastChild.style.strokeWidth = 3
        b2.lastChild.style.strokeWidth = 3
        b3.lastChild.style.strokeWidth = 3
        b4.lastChild.style.strokeWidth = 3

        switch (paylines) {
            case 1:
                play({ id: 'Line1' });

                b1.style.display = 'none';
                b2.style.display = 'none';
                b3.style.display = 'none';
                b4.style.display = 'none';
                break;
            case 2:
                play({ id: 'Line2' });

                b0.style.display = 'initial'
                b1.style.display = 'initial'
                b2.style.display = 'none';
                b3.style.display = 'none';
                b4.style.display = 'none';
                break;
            case 3:
                play({ id: 'Line3' });

                b0.style.display = 'initial'
                b1.style.display = 'initial'
                b2.style.display = 'initial'
                b3.style.display = 'none';
                b4.style.display = 'none';
                break;
            case 4:
                play({ id: 'Line4' });

                b0.style.display = 'initial'
                b1.style.display = 'initial'
                b2.style.display = 'initial'
                b3.style.display = 'initial'
                b4.style.display = 'none';
                break;
            case 5:
                play({ id: 'Line5' });

                b0.style.display = 'initial'
                b1.style.display = 'initial'
                b2.style.display = 'initial'
                b3.style.display = 'initial'
                b4.style.display = 'initial'
                break;
            default:
                play({ id: 'Line1' });

                b0.style.display = 'initial';
                break;
        }

        setgamestate(
            {
                ...gameState,
                NUMPAYLINES: paylines
            }
        )
    }

    const highlightBetline = (data) => {
        const b0 = document.getElementById('payline-0');
        const b1 = document.getElementById('payline-2');
        const b2 = document.getElementById('payline-1');
        const b3 = document.getElementById('payline-3');
        const b4 = document.getElementById('payline-4');
        if (data.PAYLINE0 === "true") {
          b0.lastChild.style.strokeWidth = 10
          console.log({ payline0: data.PAYLINE0 })
          play({ id: "win" });
        }
        if (data.PAYLINE1 === "true") {
          b1.lastChild.style.strokeWidth = 10
          play({ id: "win" });
        }
        if (data.PAYLINE2 === "true") {
          b2.lastChild.style.strokeWidth = 10
          play({ id: "win" });
        }
        if (data.PAYLINE3 === "true") {
          b3.lastChild.style.strokeWidth = 5
          play({ id: "win" });
        }
        if (data.PAYLINE4 === "true") {
          b4.lastChild.style.strokeWidth = 5
          play({ id: "win" });
        }
    }

    const betMax = async () => {
        play({ id: 'betMax' });
        handleBetLine(5);
        spin(5)
    }

    const normalSpin = async () => {
        spin()
    }

    const spin = async (betline = 0) => {
        play({ id: 'reelStart' });
        play({ id: 'ambient' });
        let bets = gamestate.NUMPAYLINES;

        if (betline === 5) {
            bets = betline
        }

        const b0 = document.getElementById('payline-0');
        const b1 = document.getElementById('payline-1');
        const b2 = document.getElementById('payline-2');
        const b3 = document.getElementById('payline-3');
        const b4 = document.getElementById('payline-4');

        b0.lastChild.style.strokeWidth = 3
        b1.lastChild.style.strokeWidth = 3
        b2.lastChild.style.strokeWidth = 3
        b3.lastChild.style.strokeWidth = 2
        b4.lastChild.style.strokeWidth = 2

        const rOne = document.querySelector('.poster p');
        // run the wheel
        ringOne.current.style.animationDuration = '0.3s';
        ringTwo.current.style.animationDuration = '0.3s';
        ringThree.current.style.animationDuration = '0.3s';
        // ringOne.current.style.filter = 'blur(5px)';
        rOne.style.filter = 'blur(45px)';
        console.log({ gameStateDenom:  gamestate, rOne})
        setspinning(true);
        const spind  = await api.casinoServlet({
            BETLINES: bets,
            USERNUM: gamestate.USERNUM,
            GAMETYPE: 'SL',
            DENOM: selectedDenom,
            USERID: gamestate.USERID,
            GAMEID: gamestate.GAMEID,
            TRANTYPE: 'SPIN',
            BET: bets,
            LASTWAGERTYPE: '1'
        })
        const spinWheels = spind.WHEELVALUES
        const wheelZero = spind.WHEEL0
        const wheelOne = spind.WHEEL1
        const wheelTwo = spind.WHEEL2

        let i,j,temparray,chunk = 3;
        let wheelsChunks = []
        for (i=0,j=spinWheels.length; i<j; i+=chunk) {
            temparray = spinWheels.slice(i,i+chunk);
            wheelsChunks.push(temparray)
        }
        console.log({ wheelsChunks })
        if (wheelTwo) {
            setTimeout(() => {
                rOne.style.filter = 'initial';
                setTimeout(() => {
                    ringOne.current.style.animationDuration = 'initial';
                }, 500);
                setTimeout(() => {
                    ringTwo.current.style.animationDuration = 'initial';
                }, 1000);
                setTimeout(() => {
                    ringThree.current.style.animationDuration = 'initial';
                    highlightBetline(spind);
                    setgamestate(
                        {
                            ...gameState,
                            WON: spind.WON,
                            NUMPAYLINES: bets,
                            CASHVALUE: spind.CASHVALUE
                        }
                    )
                    setspinning(false);

                    if (spind.WON == "0") {
                      stop();
                    } else {
                      setTimeout(() => {
                        stop();
                      }, 2000);
                    }
                }, 1500);
                // oneRef.current.innerHTML = wheelsChunks[wheelZero][0]
                // twoRef.current.innerHTML = wheelsChunks[wheelZero][1]
                // threeRef.current.innerHTML = wheelsChunks[wheelZero][2]
            }, 1000);
        }
        setwheelZero(wheelsChunks[wheelZero])
        setwheelOne(wheelsChunks[wheelOne])
        setwheelTwo(wheelsChunks[wheelTwo])
        console.log({ clickedSpin: spind })
    }

    const setReels = (data) => {
        console.log({ setReels: data  })
        if (data.wheels) {
            let i,j,temparray,chunk = 3;
            let wheelsChunks = []
            for (i=0,j=data.wheels.length; i<j; i+=chunk) {
                temparray = data.wheels.slice(i,i+chunk);
                wheelsChunks.push(temparray)
            }
            console.log({ wheelsChunks })

            setwheelZero(wheelsChunks[data.wheelZero])
            setwheelOne(wheelsChunks[data.wheelOne])
            setwheelTwo(wheelsChunks[data.wheelTwo])
            setgamestate(
                {
                    ...gameState,
                    WON: data.won,
                    NUMPAYLINES: gamestate.NUMPAYLINES,
                    CASHVALUE: gamestate.CASHVALUE
                }
            )
        }
    }

    const denomTogglerPlus = () => {
        play({ id: 'Cost' });

        const selected = denoms.indexOf(selectedDenom);

        if (selected <= denoms.length) {
            if (denoms[selected + 1]) {
                setselecteddenom(denoms[selected + 1])
            }
        }
    }

    const denomTogglerMinus = () => {
        play({ id: 'Cost' });
        const selected = denoms.indexOf(selectedDenom);

        if (selected <= denoms.length) {
            if (denoms[selected - 1]) {
                setselecteddenom(denoms[selected - 1])
            }
            console.log({ increment: denoms[selected-1] })
        }
    }

    return (
        <>
        <div className="home">
            <Header headerData={gamestate}></Header>
            <div className="app-logo-container">
                <div className="app-logo"></div>
            </div>
            <div className="reels-container">
                <div className="reels">
                    <div className="stage">
                        <div className="rotate">
                            <div className="ring ring-1" id="ring-1" ref={ringOne}>
                                <div className={ `poster ` + wheelZero[0] } style={myStyle1}>
                                    <p>{wheelZero[0]}</p>
                                </div>
                                <div className="poster b" style={myStyle2}>
                                    <p></p>
                                </div>
                                <div className="poster c" style={myStyle3}>
                                    <p></p>
                                </div>
                                <div className="poster d" style={myStyle4}>
                                    <p></p>
                                </div>
                                <div className="poster e" style={myStyle5}>
                                    <p></p>
                                </div>
                                <div className="poster f" style={myStyle6}>
                                    <p></p>
                                </div>
                                <div className="poster g" style={myStyle7}>
                                    <p></p>
                                </div>
                                <div className="poster h" style={myStyle8}>
                                    <p></p>
                                </div>
                                <div className="poster i" style={myStyle9}>
                                    <p></p>
                                </div>
                                <div className="poster j" style={myStyle10}>
                                    <p></p>
                                </div>
                                <div className={ `poster ` + wheelZero[2] }  style={myStyle11}>
                                    <p>{wheelZero[2]}</p>
                                </div>
                                <div className={ `poster ` + wheelZero[1] } style={myStyle12}>
                                    <p>{wheelZero[1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stage">
                        <div className="rotate">
                            <div className="ring ring-1" id="ring-2" ref={ringTwo}>
                                <div className={ `poster ` + wheelOne[0] } style={myStyle1}>
                                    <p>{wheelOne[0]}</p>
                                </div>
                                <div className="poster b" style={myStyle2}>
                                    <p></p>
                                </div>
                                <div className="poster c" style={myStyle3}>
                                    <p></p>
                                </div>
                                <div className="poster d" style={myStyle4}>
                                    <p></p>
                                </div>
                                <div className="poster e" style={myStyle5}>
                                    <p></p>
                                </div>
                                <div className="poster f" style={myStyle6}>
                                    <p></p>
                                </div>
                                <div className="poster g" style={myStyle7}>
                                    <p></p>
                                </div>
                                <div className="poster h" style={myStyle8}>
                                    <p></p>
                                </div>
                                <div className="poster i" style={myStyle9}>
                                    <p></p>
                                </div>
                                <div className="poster j" style={myStyle10}>
                                    <p></p>
                                </div>
                                <div className={ `poster ` + wheelOne[2] }  style={myStyle11}>
                                    <p> {wheelOne[2]}</p>
                                </div>
                                <div className={ `poster ` + wheelOne[1] } style={myStyle12}>
                                    <p>{wheelOne[1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stage">
                        <div className="rotate">
                            <div className="ring ring-1" id="ring-3" ref={ringThree}>
                                <div className={ `poster ` + wheelTwo[0] } style={myStyle1}>
                                    <p>{ wheelTwo[0] }</p>
                                </div>
                                <div className="poster b" style={myStyle2}>
                                    <p></p>
                                </div>
                                <div className="poster c" style={myStyle3}>
                                    <p></p>
                                </div>
                                <div className="poster d" style={myStyle4}>
                                    <p></p>
                                </div>
                                <div className="poster e" style={myStyle5}>
                                    <p></p>
                                </div>
                                <div className="poster f" style={myStyle6}>
                                    <p></p>
                                </div>
                                <div className="poster g" style={myStyle7}>
                                    <p></p>
                                </div>
                                <div className="poster h" style={myStyle8}>
                                    <p></p>
                                </div>
                                <div className="poster i" style={myStyle9}>
                                    <p></p>
                                </div>
                                <div className="poster j" style={myStyle10}>
                                    <p></p>
                                </div>
                                <div className={ `poster ` + wheelTwo[2] }  style={myStyle11}>
                                    <p>{ wheelTwo[2] }</p>
                                </div>
                                <div className={ `poster ` + wheelTwo[1] } style={myStyle12}>
                                    <p>{ wheelTwo[1] }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="paylines-container">
                        <svg id="payline-3" height="250" width="500" style={{
                            'position': 'absolute',
                            zIndex: 999,
                        }}>
                            <line x1="0" y1="0" x2="360" y2="241" style={{
                                stroke: 'rgb(255,0,0)',
                                strokeWidth: 2
                            }}></line>
                        </svg>
                        <svg id="payline-2" height="250" width="500" style={{
                            'position': 'absolute',
                            zIndex: 999,
                            top: 36
                        }}>
                            <line x1="0" y1="0" x2="360" y2="0" style={{
                                stroke: 'rgb(255,0,0)',
                                strokeWidth: 3
                            }}></line>
                        </svg>
                        <svg id="payline-0" height="250" width="500" style={{
                            'position': 'absolute',
                            zIndex: 999,
                            top: 119
                        }}>
                            <line x1="0" y1="0" x2="360" y2="0" style={{
                                stroke: 'rgb(255,0,0)',
                                strokeWidth:3
                            }}></line>
                        </svg>
                        <svg id="payline-1" height="250" width="500" style={{
                            'position': 'absolute',
                            zIndex: 999,
                            top: 195
                        }}>
                            <line x1="0" y1="0" x2="360" y2="0" style={{
                                stroke: 'rgb(255,0,0)',
                                strokeWidth: 3
                            }}></line>
                        </svg>
                        <svg id="payline-4" height="250" width="500" style={{
                            'position': 'absolute',
                            zIndex: 999,
                        }}>
                            <line x1="0" y1="241" x2="360" y2="0" style={{
                                stroke: 'rgb(255,0,0)',
                                strokeWidth: 2
                            }}></line>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="controls">
                <div className="bet-control">
                    <div>
                        <div className="denom-toggler">
                            <div>
                                <div className="minus-icon" onClick={denomTogglerMinus}></div>
                            </div>
                            <div>
                                <input type="text" value={selectedDenom ? selectedDenom+"p" : ""} readOnly/>
                            </div>
                            <div>
                                <div className="plus-icon" onClick={denomTogglerPlus}></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className={spinning ? 'btn-small bet-one disabled' : 'btn-small bet-one' } onClick={handleBetLine} disabled={spinning}></button>
                    </div>
                    <div>
                        <button className={spinning ? 'btn-small bet-max disabled' : 'btn-small bet-max' } onClick={betMax} disabled={spinning}></button>
                    </div>
                </div>
                <div className="spin-control">
                    <button onClick={normalSpin} className={spinning ? 'btn-spin disabled' : 'btn-spin' } disabled={spinning}>SPIN</button>
                </div>
            </div>
        </div>
        </>
    )
}
