/* Identification2.js */
//예약정보 출력 전 본인 인증
import React, {useState} from "react";
import Axios from 'axios'
import {useHistory} from "react-router";
import './Identification.css'


function Identification2(){
    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const ID = () => {
        Axios.post('http://localhost:3001/identify2', {
            username: username, 
            password: password,
        }).then((response) => {
            console.log(response);
            if(response.data.length > 0){
                console.log("본인 인증 성공");
                history.push({
                    pathname: "./printRInfo",
                    state:{
                        idStatus: response.data,
                    }
                });
            }
            else{
                alert("예약 정보가 없습니다!");
                backtomain();
            }
        })
    }

    const backtomain = () => {
        Axios.post('http://localhost:3001/login2',{
            password: password,
        }).then((response2) => {
            if(response2.data.message === "병원장")
                history.push({pathname: "./main/HP"});
            else
                history.push({pathname: "./main"});
        });
    }

    return(
        <div className = "App">
            <div className="Identification">
                <h1 className="identitle">본인 확인</h1>
                <input type="text" className="idenblock" placeholder="Username..."
                    onChange={(e) => {
                    setUsername(e.target.value);
                    }
                }/><br></br>
                <input type="password" className="idenblock" placeholder="Password..."
                    onChange={(e) => {
                    setPassword(e.target.value);
                    }
                }/><br></br><br></br>
                <button onClick={ID} className="idenbutton"> 확인 </button>
            </div>
            
        </div>
    )
}

export default Identification2;