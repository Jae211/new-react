/* Quit.js */
//회원 탈퇴
import React, {useState} from "react";
import Axios from 'axios'
import {useHistory} from "react-router";
import './Quit.css'

function Quit(){
    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [quitStatus, setQuitStatus] = useState('');

    const quit = () => {
        Axios.post('http://localhost:3001/quit', {
            username: username, 
            password: password,
        }).then((response) => {
            if(response.data.message){
                setQuitStatus(response.data.message);
                if(response.data.message === "quit succeed!"){
                    history.push({pathname: "./Bye"});
                }
                else if(response.data.message === "정보 없음"){
                    alert("존재하지 않는 회원입니다!");
                }
            }
        })
    }

    const conf = () => {
        var result = window.confirm("정말 탈퇴하시겠습니까?");
        if(result){
            quit();
        }
        else{
            alert("취소되었습니다.");
            history.push({pathname: "./"});
        }
    }

    return(
        <div className = "App">
            <div className="quit">
                <h1 className="quittitle">Quit</h1>
                <input type="text" className="quitblock" placeholder="이름을 입력하세요..."
                    onChange={(e) => {
                    setUsername(e.target.value);
                    }
                }/><br></br>
                <input type="password" className="quitblock" placeholder="주민번호를 입력하세요..."
                    onChange={(e) => {
                    setPassword(e.target.value);
                    }
                }/><br></br><br></br>
                <button onClick={conf} className="quitbutton"> 탈퇴하기 </button>
            </div>
            <h1>{quitStatus}</h1>
            
        </div>
    )

}

export default Quit;