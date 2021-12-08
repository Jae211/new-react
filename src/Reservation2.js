/* Reservation2.js */
//날짜, 시간, 병원이름 선택해서 예약
import React, { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as Axios from "axios";
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete'
import './Main.css'

function Reservation2(){
    const location = useLocation();
    const history = useHistory();

    const username = location.state.username;
    const password = location.state.password;
    const age = location.state.age;

    const [startDate, setStartDate] = useState(new Date());

    var year = (startDate.getFullYear()).toString();
    var month = (startDate.getMonth()+1).toString();
    var date = (startDate.getDate()).toString();

    var reserv_date = year.concat("-")
    reserv_date = reserv_date.concat(month);
    reserv_date = reserv_date.concat("-");
    reserv_date = reserv_date.concat(date);

    const timeoptions = ['09:00', '10:00','11:00','12:00','13:00','14:00',
    '15:00','16:00','17:00','18:00']
    const [timeReg, setTimeReg] = useState('');
    var time = timeReg.concat(":00");

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
    
    const reservate = () => {
        Axios.post('http://localhost:3001/reserv2',{
            username: username,
            password: password,
            age: age,
            hospital: chooseHosp,
            date: reserv_date,
            time: time,
        }).then((response) => {
            if(response.data.message){
                alert(response.data.message);
                if(response.data.message === "예약 성공!"){
                    backtomain();
                }
            }
        })
    }

    /* 시 정보 */
    const[SiInfo, setSiInfo] = useState([]);
    const getSi = () => {
        Axios.post('http://localhost:3001/getSi')
        .then((response) => {
            console.log(response.data);
            setSiInfo(response.data);
        })
    }
    const[chooseSi, setChooseSi] = useState('');
    const handleSelect = (e) => {
        setChooseSi(e.target.value);
    }

    /* 구 정보 */
    const [GuInfo, setGuInfo] = useState([]);
    const getGu = () => {
        Axios.post('http://localhost:3001/getGu',{
            Si: chooseSi,
        }).then((response) => {
            console.log(response.data);
            setGuInfo(response.data);
        })
    }
    const[chooseGu, setChooseGu] = useState('');
    const handleSelect2 = (e) => {
        setChooseGu(e.target.value);
    }

    /* 동 정보 */
    const [DongInfo, setDongInfo] = useState([]);
    const getDong = () => {
        Axios.post('http://localhost:3001/getDong',{
            Si: chooseSi,
            Gu: chooseGu,
        }).then((response) => {
            console.log(response.data);
            setDongInfo(response.data);
        })
    }
    const[chooseDong, setChooseDong] = useState('');
    const handleSelect3 = (e) => {
        setChooseDong(e.target.value);
    }
    
    /* 병원 정보 */
    const [HospInfo, setHospInfo] = useState([]);
    const getHosp = () => {
        Axios.post('http://localhost:3001/getHosp',{
            Si: chooseSi,
            Gu: chooseGu,
            Dong: chooseDong,
        }).then((response) => {
            console.log(response.data);
            setHospInfo(response.data);
        })
    }
    const[chooseHosp, setChooseHosp] = useState('');
    const handleSelect4 = (e) => {
        var hosp = e.target.value.split("(");
        setChooseHosp(hosp[0]);
    }

    return (
        <div className="App">
            <div className="reservation2">
                <h1 className="reservtitle">예약날짜 선택 및 의료기관 찾기</h1>
                
                <label2> 날짜 선택하기 </label2>
                <DatePicker className="loginblock"
                    popperPlacement="auto"
                    dateFormat="yyyy-MM-dd" 
                    selected = {startDate} 
                    onChange={date => setStartDate(date)}
                />
                <br></br><br></br><br></br>

                <label2> 시간 선택하기 </label2>
                <div style={{marginLeft:'41.25%'}}>
                    <AutoComplete
                        options={timeoptions}
                        style={{width : 300}}
                        onChange = {(event, value) => setTimeReg(value)}
                        renderInput={(params) =>
                            <TextField {...params} variant="outlined"/>}
                    />
                </div>
                <br></br><br></br><br></br>

                <label2> 병원 선택하기 </label2><br></br>
                <h8> 선택 전 불러오기 버튼을 눌러주세요! </h8>
                <br></br><br></br>
                <button onClick={getSi} className="selectbutton">시 정보 불러오기</button> &ensp;
                <button onClick={getGu} className="selectbutton">구 정보 불러오기</button> &emsp;
                <button onClick={getDong} className="selectbutton">동 정보 불러오기</button> &emsp;&emsp;&emsp;&nbsp;
                <button onClick={getHosp} className="selectbutton">병원 불러오기</button> &nbsp;&emsp;&emsp;&emsp;&emsp;
                <br></br><br></br>

                <select onChange={handleSelect} className="selectbutton">
                    <option>시 선택</option>
                    {SiInfo.map(x => {
                        return <option key={x.Si}>{x.Si}</option>
                    })}
                </select>
                &emsp;
                
                <select onChange={handleSelect2} className="selectbutton">
                    <option>구 선택</option>
                    {GuInfo.map(x => {
                        return <option key={x.Gu}>{x.Gu}</option>
                    })}
                </select>
                &emsp;
                
                <select onChange={handleSelect3} className="selectbutton">
                    <option>동 선택</option>
                    {DongInfo.map(x => {
                        return <option key={x.Dong}>{x.Dong}</option>
                    })}
                </select>
                &emsp;
                
                <select onChange={handleSelect4} className="selectbutton2">
                    <option>병원 선택</option>
                    {HospInfo.map(x => {
                        return <option key={x.HName}>{x.HName}(잔여백신 {x.Remain}개)</option>
                    })}
                </select>
                <br></br><br></br>
                
                <button onClick={reservate} className="mainbutton"> 예약하기 </button>
            </div>
        </div>
    )
}

export default Reservation2;
