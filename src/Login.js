/* Login.js */
//로그인
import React, {useState} from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import {useHistory} from "react-router";
import './Login.css'

function Login(){

    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username, 
            password: password,
        }).then((response) => {
            if(response.data.message){
                alert(response.data.message);
            }
            else{
                Axios.post("http://localhost:3001/login2",{
                    password: password,
                }).then((response2) => {
                    if(response2.data.message === "병원장")
                        history.push({pathname: "./main/HP"});
                    else
                        history.push({pathname: "./main"});
                })
            }
        })
    }

    return(
        <div className = "App">
            <div className="login">
                <h1 className="logintitle">Login</h1>
                <input type="text" className="loginblock" placeholder="이름을 입력하세요..."
                    onChange={(e) => { setUsername(e.target.value);}
                }/><br></br>
                <input type="text" className="loginblock" placeholder="주민번호를 입력하세요..."
                    onChange={(e) => { setPassword(e.target.value); }
                }/><br></br><br></br><br></br>
                <button onClick={login} className="loginbutton"> 로그인 </button>
                &nbsp; 
                <Link to ="/register">
                    <button className="otherbutton"> 회원가입 </button> 
                </Link>
                &nbsp;
                <Link to ="/quit">
                    <button className="otherbutton"> 회원탈퇴 </button>
                </Link>
            </div>
        </div>
    )
}

export default Login;