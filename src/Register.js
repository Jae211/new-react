/* Register.js */
//회원가입
import React, {useState} from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import './Register.css'

function Register(){

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [ageReg, setAgeReg] = useState('')
    const [sexReg, setSexReg] = useState('')
    const [phonenumReg, setPhonenumReg] = useState('')
    const [vaccinedReg, setVaccinedReg] = useState('')
    //register에 사용
    
    const[nameerror, setnameerror] = useState('')
    const[passwderror, setpasswderror] = useState('')
    const[ageerror, setageerror] = useState('')
    const[sexerror, setsexerror] = useState('')
    const[phonenumerror, setphonenumerror] = useState('')
    const[vaccineerror, setvaccineerror] = useState('')

    const checkname = (data) =>{
      if(data.length <= 0)
        setnameerror("이름은 필수로 입력해야 합니다.");
      else
        setnameerror("");
    }

    const checkpasswd = (data) =>{
      if(data.length !== 14)
      setpasswderror("주민번호는 010101-1234567 형태로 입력해야 합니다.");
      else
      setpasswderror("");
    }

    const checkage = (data) =>{
      if(data.length <= 0)
      setageerror("나이는 필수로 입력해야 합니다.");
      else
      setageerror("");
    }

    const checksex = (data) =>{
      if(data !== 'M' && data !== 'F')
      setsexerror("성별은 M 또는 F로 입력해야 합니다.");
      else
      setsexerror("");
    }

    const checkphonenum = (data) =>{
      if(data.length !== 13)
      setphonenumerror("전화번호는 010-1234-5678 형태로 입력해야 합니다.");
      else
      setphonenumerror("");
    }

    const checkvaccine = (data) =>{
      if(data < 0 || data > 2)
      setvaccineerror("접종여부는 0, 1, 2 중 하나로 입력해야 합니다.");
      else
      setvaccineerror("");
    }

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg, 
            password: passwordReg,
            age: ageReg,
            sex: sexReg,
            phonenum: phonenumReg,
            vaccined: vaccinedReg,
        }).then((response) => {
            if(response.data.message === "실패"){
              alert("이미 존재하는 주민번호입니다!");
            }
            else if(response.data.message === "성공"){
              alert("회원 가입 성공!");
            }
        })
    }

    return (
      <div className="App">
          <div className="registration">
          <h1 className="registertitle">회원가입</h1>
              
              <label>이름 </label><span>*</span><br></br>
              <input type="text" onChange={(e) => {
                setUsernameReg(e.target.value);
                checkname(e.target.value);
              }}/>
              <br></br><h8 className="h8">{nameerror}</h8>
              <br></br><br></br>
              <label>주민번호 </label><span>*</span><br></br>
              <h7>ex)010101-1234567 </h7><br></br>
              <input type="text" onChange={(e) => {
                  setPasswordReg(e.target.value);
                  checkpasswd(e.target.value);
              }}/>
              <br></br><h8 className="h8">{passwderror}</h8>
              <br></br><br></br>
              <label>나이 </label><span>*</span><br></br>
              <h7>만 나이로 입력해주세요 </h7><br></br>
              <input type="text"
              onChange={(e) => {
                  setAgeReg(e.target.value);
                  checkage(e.target.value);
              }}/>
              <br></br><h8 className="h8">{ageerror}</h8>
              <br></br><br></br>
              <label>성별 </label><span>*</span><br></br>
              <h7> 여자:F, 남자:M </h7><br></br>
              <input type="text"
              onChange={(e) => {
                  setSexReg(e.target.value);
                  checksex(e.target.value);
              }}/>
              <br></br><h8 className="h8">{sexerror}</h8>
              <br></br><br></br>
              <label>전화번호 </label><br></br>
              <h7>ex)010-1234-5678 </h7><br></br>
              <input type="text"
              onChange={(e) => {
                setPhonenumReg(e.target.value);
                checkphonenum(e.target.value);
                }}/>
                <br></br><h8 className="h8">{phonenumerror}</h8>
                <br></br><br></br>
              <label>접종여부 </label><span>*</span><br></br>
              <h7>접종 X: 0, 한 번 접종: 1, 두 번 접종: 2 </h7><br></br>
              <input type="text"
              onChange={(e) => {
                setVaccinedReg(e.target.value);
                checkvaccine(e.target.value);
                }}/>
                <br></br><h8 className="h8">{vaccineerror}</h8>
                <br></br><br></br><br></br><br></br>
              <button onClick={register} className='registerbutton'> 가입하기 </button>
              <Link to ="/">
                  <button className='registerbutton2'> 로그인하러가기 </button>
              </Link>
          </div>
      </div>
    )
}

export default Register;
