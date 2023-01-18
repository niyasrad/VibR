import React from "react";
import './navbar.css';

import vibr from '../../assets/vibr.png';
export default function Navbar(props: any) {
    return (
        <div className="nav">
         <div className="nav-desktop">
            <img src={vibr} alt="" />
            <div className="nav-desktop-buttons">
                <div className="nav-button">Home</div>
                <div className="nav-button">Card</div>
            </div>
         </div>   
         <div className="nav-mobile">
            <img src={vibr} alt="" />
         </div>
        </div>
    )
}