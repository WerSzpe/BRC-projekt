import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="nav-container">
    <ul className='nav nav-pills mb-3 ul-nav' id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
            <span className="app-title">HomeHome</span>
        </li>
        <li className="nav-item" role="presentation">
          <Link to="/home" className="nav-link nav-point" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                            aria-controls="pills-home" aria-selected="true">Home</Link>
        </li>
        <li className="nav-item" role="presentation">
        <Link to="/sensors" className="nav-link nav-point" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                            aria-controls="pills-home" aria-selected="true">Sensors</Link>
        </li >
        <li className="nav-item" role="presentation">
        <Link to="/leds" className="nav-link nav-point" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                            aria-controls="pills-home" aria-selected="true">Leds</Link>
        </li>
        <li className="nav-item" role="presentation">
        <Link to="/login" className="nav-link nav-point" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                            aria-controls="pills-home" aria-selected="true">Login</Link>
        </li>

       <div className="clear-float"></div>
    </ul>
    </div>
  )
}

export default Header;