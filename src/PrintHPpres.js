/* PrintHPpres */
//회원가입을 한 전체 병원장 정보 출력 (이름, 전화번호, 병원이름)
import React from "react";
import { useLocation } from 'react-router-dom';

function PrintHPpres() {

    const location = useLocation();
    const Status = location.state.PresStatus;
    console.log(Status);

    return(
        <div className = "PrintHP_pres">
            <div className="printInfo">
            <h1 className="identitle">병원장 정보</h1>
            <ul>
                {Status.map(info =>(
                <li key = {info.HName}>
                    <br></br><br></br><br></br><br></br>
                    <label className="printlabel2">병원장 이름:  {info.UName}</label><br></br><br></br>
                    <label className="printlabel2">병원장 전화번호:  {info.PNum}</label><br></br><br></br>
                    <label className="printlabel2">병원 이름:  {info.HName}</label></li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default PrintHPpres;