/* Authenticate.js */
//병원장인지 인증 후 해당 병원의 예약정보 불러옴
import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import Axios from 'axios'

function Authenticate() {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hospitalname, setHospitalname] = useState('');

    const Check = () => {
        Axios.post('http://localhost:3001/authenticate', {
            username: username,
            password: password,
            hospital: hospitalname,
        }).then((response) => {
            console.log(response);
            if(response.data.length > 0){
                alert("본인 인증 성공!");
                history.push({
                    pathname: "./printHPInfo",
                    state:{
                        hospState: response.data,
                    }
                });
            }
            else{
                alert(response.data.message);
            }
        })
    }

    return(
        <div className = "App">
            <div className="Authenticate">
                <h1 className="identitle">본인 확인</h1>
                <input type="text" className="idenblock" placeholder="이름..."
                    onChange={(e) => {
                    setUsername(e.target.value);
                    }
                }/><br></br>
                <input type="password" className="idenblock" placeholder="주민번호..."
                    onChange={(e) => {
                    setPassword(e.target.value);
                    }
                }/><br></br>
                <input type="text" className="idenblock" placeholder="병원이름..."
                    onChange={(e) => {
                    setHospitalname(e.target.value);
                    }
                }/><br></br><br></br>
                <button onClick={Check} className="idenbutton"> 확인 </button>
            </div>
        </div>
    )

}

export default Authenticate;