/* VaccHosp.js */
//안심병원 출력
import React from "react";
import { useLocation } from "react-router-dom";

function VaccHosp(){
    const location = useLocation();
    const HInfo = location.state.HInfo;

    return(
        <div className = "App">
            <div className="printInfo">
            <h1 className="identitle">안심병원 리스트</h1><br></br>
            <ul>
                {HInfo.map(info =>(
                <li key = {info.Ssn}>
                    <label className="printlabel">병원 이름:  {info.HName}</label><br></br><br></br>
                    <label className="printlabel">주소:  {info.Addr}</label><br></br><br></br>
                    <label className="printlabel">번호:  {info.HNum}</label><br></br><br></br><br></br><br></br></li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default VaccHosp;