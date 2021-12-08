/* PrintRInfo.js */
//Reservation Info를 출력 + 병원 상세정보 출력
import React, {useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Axios from 'axios'
import './PrintRInfo.css'

function PrintRInfo(){

    const location = useLocation();
    const history = useHistory();
    const idStatus = location.state.idStatus;
    const [HInfo, setHInfo] = useState([]);
    var password = idStatus[0].Ssn;
    
    const printHInfo = (e) => {
        Axios.post('http://localhost:3001/hinfo', {
            HName: e,
        }).then((response) => {
            console.log(response);
            if(response.data.length > 0){
                setHInfo(response.data);
            }
        })
    }

    const ClickHandler = (e) => {
        printHInfo(e);
    }

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
            <div className="ReservationInfo">
                <h1 className="Reservtitle">예약정보 조회</h1>
            <ul className="Reservinfo">
                {idStatus.map(info =>(
                <li key = {info.Ssn}>
                    <label className="printlabel">이름:{info.UName}</label><br></br><br></br>
                    <label className="printlabel">주민번호:{info.Ssn}</label><br></br><br></br>
                    <label className="printlabel">나이:{info.Age}</label><br></br><br></br>
                    <label className="printlabel">병원이름:{info.HName}</label><br></br><br></br>
                    <label className="printlabel">예약날짜:{info.RDate.substring(0,10)}</label><br></br><br></br>
                    <label className="printlabel">예약시간:{info.RTime}</label><br></br><br></br>
                    <button className="hosinfobutton" onClick={(e)=>{ClickHandler(info.HName)} } > 병원정보 </button><br></br><br></br>
                </li>
                ))}
            </ul>
            <hr></hr>
            <h1 className="Reservtitle2">병원 정보</h1>
            <ul>
                {HInfo.map(info =>(
                <li key = {info.Ssn}>
                    <label className="printlabel">병원이름: {info.HName}</label><br></br><br></br>
                    <label className="printlabel">병원 전화번호: {info.HNum}</label><br></br><br></br>
                    <label className="printlabel">병원 잔여백신 개수: {info.Remain}</label><br></br><br></br>
                    <label className="printlabel">병원 주소: {(info.Si).concat(" ").concat(info.Gu).concat(" ").concat(info.Dong).concat(" ").concat(info.Detail)}</label><br></br>
                </li>
                ))}
            </ul>
            <button className="printbutton" onClick={backtomain}>메인 페이지로 돌아가기</button>
            </div>
        </div>
    )
}

export default PrintRInfo;