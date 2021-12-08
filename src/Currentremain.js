/*Currentremain.js*/
//병원 별 잔여 백신 현황 출력
import React from "react";
import { useLocation } from 'react-router-dom';

function Currentremain(){

    const location = useLocation();
    const idStatus = location.state.remain;

    return(
        <div className = "printInfo">
            <div>
            <h1 className = "identitle">병원별 잔여 백신 현황</h1>
            <ul>
                {idStatus.map(info =>(
                <li key = {info.HName}>
                    <br></br><br></br><br></br>
                    <label className="printlabel2">병원 이름:  {info.HName}</label><br></br><br></br>
                    <label className="printlabel2">잔여 백신 개수:  {info.Remain}</label></li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Currentremain;