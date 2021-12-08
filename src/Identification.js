/* Identification.js */
//개인정보 출력 전 본인 인증
import React, {useState} from "react";
import Axios from 'axios'
import {useHistory} from "react-router";
import './Identification.css'


function Identification(){
    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const ID = () => {
        Axios.post('http://localhost:3001/login', {
            username: username, 
            password: password,
        }).then((response) => {
            console.log(response);
            if(response.data.length > 0){
                console.log("본인 인증 성공");
                alert("본인 인증 성공!");
                history.push({
                    pathname: "./printUInfo",
                    state:{
                        idStatus: response.data,
                    }
                });
            }
            else{
                alert("본인 인증 실패!");
            }
        })
    }
    
    return(
        <div className = "App">
            <div className="Identification">
                <h1 className="identitle">본인 확인</h1>
                <input type="text" className="idenblock" placeholder="이름을 입력하세요..."
                    onChange={(e) => {
                    setUsername(e.target.value);
                    }
                }/><br></br>
                <input type="password" className="idenblock" placeholder="주민번호를 입력하세요..."
                    onChange={(e) => {
                    setPassword(e.target.value);
                    }
                }/><br></br><br></br>
                <button onClick={ID} className="idenbutton"> 확인 </button>
            </div>            
        </div>
    )
}

export default Identification;