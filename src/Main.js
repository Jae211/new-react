/* Main.js */
//일반 회원의 Main 화면
import React from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from 'axios';
import './Main.css'


function Main() {
    const history = useHistory();

    const getHInfo = () => {
        Axios.post('http://localhost:3001/vaccinehosp',{
        }).then((response) => {
            console.log(response);
            if(response.data.length > 0)
                history.push({
                    pathname: "./vaccinehosp",
                    state:{
                        HInfo : response.data,
                    }
                });
            else{
                alert("데이터 불러오기에 실패했습니다!");
            }
        });
    }

    return (
        <div className="App">
            <div className = "main">
                <h1 className="maintitle">Mainpage</h1>
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

                <button onClick={getHInfo} className="mainbutton"> 안심접종 병원 조회하러가기 </button>
                <br></br><br></br><br></br><br></br>

                <Link to = "/chart">
                    <button className="mainbutton"> 차트 확인하러 가기 </button>
                </Link>
            </div>
        </div>
    )
}

export default Main;