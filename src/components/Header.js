import React, { useState, useEffect } from 'react'
import { formatMoney, parseNumbers } from '../utils/numbers';

export const Header = ({ headerData, soundToggle, clickPaytable }) => {
    const [paytable, setpaytable] = useState(false);

    const showPaytable = () => {
        setpaytable(!paytable);
        clickPaytable()
    }

    const toggleSound = (e) => {
      if (!e.target.classList.contains('off')) {
        e.target.classList.add('off');
      } else {
        e.target.classList.remove('off');
      }
      soundToggle();
    }

    return (
        <>
        <div className="header-container">
            <div className="profile">
                <div className="user-container">
                    <div className="user-image"></div>
                    <div>
                        <div>Username: { headerData.ALIAS }</div>
                        <div>Game ID: { headerData.GAMEIDENT }</div>
                    </div>
                </div>
                <div className="topbar-icons">
                    <div className="app-icon settings-icon"></div>
                    <div onClick={toggleSound} className="app-icon audio-icon"></div>
                    <div className="app-icon money-icon"></div>
                    <div className="app-icon help-icon"></div>
                    <div className="app-icon close-icon"></div>
                </div>
            </div>
            <div className="header-display">
                <div>
                    <div className="icon-wrap">
                        <div className="icon coins-icon"></div>
                        <input type="text" value={ headerData.CASHVALUE ? (headerData.CASHVALUE * 0.25).toFixed(2).toLocaleString('en-US', {maximumFractionDigits:2}) : "" } disabled readOnly />
                        {/* <input type="text" value={ headerData.CASHVALUE ?  formatMoney(headerData.CASHVALUE * 0.25) : "" } disabled readOnly /> */}
                    </div>
                    <div className="label-container">
                        <span></span>
                        <p>BANK</p>
                    </div>
                </div>
                <div>
                    <div className="icon-wrap">
                        <div className="icon stars-icon"></div>
                        <input type="text" value={ headerData.NUMPAYLINES ? headerData.NUMPAYLINES : "" } disabled readOnly />
                    </div>
                    <div className="label-container">
                        <span></span>
                        <p>BET</p>
                    </div>
                </div>
                <div>
                    <div className="icon-wrap">
                        <div className="icon chip-icon"></div>
                        <input type="text" value={ headerData.WON ? headerData.WON : "" } disabled readOnly />
                    </div>
                    <div className="label-container">
                        <span></span>
                        <p>WIN</p>
                    </div>
                </div>
            </div>
        </div>
        {
            paytable && (
                <div className="paytable-container-open">
                    <div className="paytable"></div>
                    <div id="paytable-open" onClick={showPaytable}></div>
                </div>
            )
        }
        <div id="paytable-closed" onClick={showPaytable}></div>
        </>
    )
}
