/* PrintHPInfo.js */
//병원장 전용 정보 출력
import React from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Axios from 'axios'
import './Main.css'

function PrintHPInfo(){
    const location = useLocation();
    const history = useHistory();

    const hospState = location.state.hospState;
    var hospital=hospState[0].HName;

    const meminfo = () => {
        console.log(hospState);
        if(hospState.length <= 0 ){
            alert("예약 회원이 없습니다!")
        }
        else{
            history.push({
                pathname: "./meminfo",
                state: { hospState: hospState }
            })
        }
    }

    const otherhp = () => {
        Axios.post('http://localhost:3001/otherhp', {
        }).then((response) => {
            if(response.data.length > 0){
                history.push({
                    pathname: "./printHP_pres",
                    state:{
                        PresStatus: response.data,
                    }
                })
            }
            else{
                alert("병원장 정보 없음!");
            }
        })
    }

    const currentremain=()=>{
        Axios.post('http://localhost:3001/currentremain', {
        }).then((response) => {
            console.log(response);
            if(response.data.message === "병원별 잔여 백신 현황 불러오기 실패"){
                alert(response.data.message);
            }
            else{
                history.push({
                    pathname: "./Currentremain",
                    state:{
                        remain:response.data,
                    }
                })
            }
        })
    }

    const ordervaccine = () => {
        Axios.post('http://localhost:3001/ordervaccine', {
            HName: hospital,
        }).then((response) => {
            console.log(response);
            if(response.data.message === "백신개수 추가 실패"){
                alert(response.data.message);
            }
            else{
                alert(response.data.message);
            }
        })
    }

    return(
        <div className = "App">
            <div className="PrintHPInfo">
                <h1 className="maintitle">병원정보 확인</h1><br></br><br></br><br></br><br></br>
                <button className="mainbutton" onClick={meminfo}>회원 목록</button><br></br><br></br><br></br><br></br>
                <button className="mainbutton" onClick={otherhp}> 다른 병원장 목록 </button><br></br><br></br><br></br><br></br>
                <button className="mainbutton" onClick={currentremain}> 병원별 잔여 백신 현황 </button><br></br><br></br><br></br><br></br>
                <button className="mainbutton" onClick={ordervaccine}>추가 백신 신청 (10개)</button>
            </div>
        </div>
    )    
}

export default PrintHPInfo;