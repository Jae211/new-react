/* PrintUInfo.js */
//User Info를 출력
import React from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Axios from 'axios'
import './PrintUInfo.css'


function PrintUInfo(){
    const location = useLocation();
    const history = useHistory();

    const idStatus = location.state.idStatus;
    var password = idStatus[0].Ssn;

    const backtomain = () => {
        Axios.post("http://localhost:3001/login2",{
            password: password,
        }).then((response) => {
            if(response.data.message === "병원장")
                history.push({pathname: "./main/HP"});
            else
                history.push({pathname: "./main"});
        })
    }

    return(
        <div className = "App">
            <div className="printInfo">
            <ul>
                {idStatus.map(info =>(
                <li key = {info.Ssn}>
                    <h1 className="identitle">{info.UName}님의 회원정보</h1>
                    <label className="printlabel">이름:  {info.UName}</label><br></br><br></br>
                    <label className="printlabel">주민번호:  {info.Ssn}</label><br></br><br></br>
                    <label className="printlabel">나이:  {info.AGE}</label><br></br><br></br>
                    <label className="printlabel">성별:  {info.Sex}</label><br></br><br></br>
                    <label className="printlabel">전화번호:  {info.PNum}</label><br></br><br></br>
                    <label className="printlabel">접종횟수:  {info.Shot_Num}</label></li>
                ))}
            </ul>
            <button className="printbutton" onClick={backtomain}>메인 페이지로 돌아가기</button>
            </div>
        </div>
    )
}

export default PrintUInfo;