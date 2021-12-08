/* MemInfo.js */
//해당 병원에서 접종예약을 한 회원 정보 출력
import React from "react";
import { useLocation } from 'react-router-dom';

function MemInfo (){
    const location = useLocation();
    const hospState = location.state.hospState;

    return(
        <div className = "App">
            <div className="printInfo">
            <h1 className="identitle">병원 회원정보</h1>
            <ul>
                {hospState.map(info =>(
                <li key = {info.RNum}>
                    <br></br><br></br><br></br><br></br>
                    <label className="printlabel2">예약번호:  {info.RNum}</label><br></br><br></br>
                    <label className="printlabel2">이름:  {info.UName}</label><br></br><br></br>
                    <label className="printlabel2">주민번호:  {info.Ssn}</label><br></br><br></br>
                    <label className="printlabel2">나이:  {info.Age}</label><br></br><br></br>
                    <label className="printlabel2">병원이름:  {info.HName}</label><br></br><br></br>
                    <label className="printlabel2">예약날짜:  {info.RDate.substring(0,10)}</label><br></br><br></br>
                    <label className="printlabel2">예약시간:  {info.RTime}</label></li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default MemInfo;