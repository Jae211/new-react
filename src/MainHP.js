/* MainHP.js */
//병원장의 Main 화면
import React from "react";
import { Link } from "react-router-dom";
import './Main.css'

function MainHP() {

    return (
        <div className="App">
            <div className = "main">
            <h1 className="maintitle">Main-H-page</h1>
            <br></br><br></br><br></br>
                <Link to ="/identify">
                    <button className="mainbutton"> 개인정보 조회하러가기 </button>
                    <br></br><br></br><br></br><br></br>
                </Link>
                <Link to ="/identify2">
                    <button className="mainbutton"> 예약정보 조회하러가기 </button>
                    <br></br><br></br><br></br><br></br>
                </Link>
                <Link to ="/reservation">
                    <button className="mainbutton"> 백신 예약 하러가기 </button>
                    <br></br><br></br><br></br><br></br>
                </Link>
                <Link to ="/authenticate">
                <button className="mainbutton"> 병원정보 확인 하러가기 </button>
                <br></br><br></br><br></br><br></br>
                </Link>
                <Link to = "/chart">
                    <button className="mainbutton"> 차트 확인하러 가기 </button>
                </Link>
            </div>
            
        </div>
    )
}

export default MainHP;