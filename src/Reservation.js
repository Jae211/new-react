/* Reservation.js */
//예약 위한 회원정보 입력받고 접종 대상자인지 판단
import React, {useState} from "react";
import {useHistory} from "react-router";
import * as Axios from "axios";
import './Reservation.css'

function Reservation(){

    const history = useHistory();

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [ageReg, setAgeReg] = useState('')

    const Info = () => {
        history.push({
            pathname: "./reservation2",
            state: {
                username: usernameReg,
                password: passwordReg,
                age: ageReg
            }
        });
    }

    const backtomain = () => {
        Axios.post('http://localhost:3001/login2',{
            password: passwordReg,
        }).then((response2) => {
            if(response2.data.message === "병원장")
                history.push({pathname: "./main/HP"});
            else
                history.push({pathname: "./main"});
        });
    }

    const shotnumtest = () => {
        Axios.post('http://localhost:3001/shotnumtest',{
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            if(response.data.message){
                if(response.data.message === "접종 대상자 아님"){
                    alert("접종 대상자가 아닙니다!");
                    backtomain();
                }
                else{
                    Info();
                }
            }
        })
    }

    return (
        <div className="App">
            <h1 className="reservtitle">개인 정보 입력</h1>
                <div className="reservation">
                <label>이름 </label><span>*</span><br></br>
                <input type="text"
                onChange={(e) => {
                    setUsernameReg(e.target.value);
                }}
                /><br></br><br></br>
                <label>주민번호 </label><span>*</span><br></br>
                <h7>ex)010101-1234567 </h7><br></br>
                <input type="text"
                onChange={(e) => {
                    setPasswordReg(e.target.value);
                    }}
                /><br></br><br></br>
                <label>나이 </label><span>*</span><br></br>
                <h7>만 나이로 입력해주세요 </h7><br></br>
                <input type="text"
                onChange={(e) => {
                    setAgeReg(e.target.value);
                    }}
                /><br></br><br></br><br></br>
                </div>
            <button onClick={shotnumtest} className='reservationbutton'> 예약날짜 선택 및 의료기관 찾기  </button>
        </div>
    )

}

export default Reservation;