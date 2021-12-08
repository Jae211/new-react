/* Chart.js */
//차트 출력
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar } from 'recharts';
import Axios from 'axios'
import "./Chart.css"

function Chart() {

  const [data,setdata]=useState([]);
  const [data2,setdata2]=useState([]);
  const [data3,setdata3]=useState([]);
  const [data4,setdata4]=useState([]);
  const [data5,setdata5]=useState([]);

  const Chart1=()=>{
    Axios.post('http://localhost:3001/chart', {
    }).then((response) => {
        if(response.data.message){
            console.log("확진자 정보 불러오기 실패!")
        }
        else{
            setdata(response.data);
        }
    })
  }

  const Chart2=()=>{
    Axios.post('http://localhost:3001/chart2', {
    }).then((response) => {
        if(response.data.message){
            console.log("누적 확진자 정보 불러오기 실패!")
        }
        else{
            setdata2(response.data);
        }
    })
  }

  const Chart3=()=>{
    Axios.post('http://localhost:3001/chart3', {
    }).then((response) => {
        if(response.data.message){
            console.log("일별 접종자 정보 불러오기 실패!")
        }
        else{
            setdata3(response.data);
        }
    })
  }

  const Chart4=()=>{
    Axios.post('http://localhost:3001/chart4', {
    }).then((response) => {
        if(response.data.message){
            console.log("누적 접종자 정보 불러오기 실패!")
        }
        else{
            setdata4(response.data);
        }
    })
  }

  const Chart5=()=>{
      Axios.post('http://localhost:3001/chart5',{
      }).then((response) => {
          if(response.data.message){
              console.log("연령대별 접종자 정보 불러오기 실패!")
          }
          else{
              setdata5(response.data);
          }
      })
  }

    return (
        <div className="App">
            <h1 className="chartpagetitle">차트</h1><br></br><br></br>
            <div>
                <div className="charttitle1" >일별 확진자 수</div><br></br>
                <button className="chart1button" onClick={Chart1}> 차트 보기 </button>
                <div className = "chart">
                <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="CDate" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="확진자수" stroke="#7ac4c0" />
                </LineChart>
                </div>
            </div>
            <br></br><br></br>
            <div>
                <div className="charttitle1" >누적 확진자 수</div><br></br>
                <button className="chart1button" onClick={Chart2}> 차트 보기 </button>
                <div className = "chart">
                <LineChart width={500} height={300} data={data2} margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="CDate" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="누적확진자수" stroke="#7ac4c0" />
                </LineChart>
                </div>
            </div>
            <br></br><br></br>
            <div>
                <div className="charttitle1" >일별 접종자 수</div><br></br>
                <button className="chart1button" onClick={Chart3}> 차트 보기 </button>
                <div className = "chart">
                <LineChart width={500} height={300} data={data3} margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="RDate" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="일별접종자수" stroke="#7ac4c0" />
                </LineChart>
                </div>
            </div>
            <br></br><br></br>
            <div>
                <div className="charttitle1" >누적 접종자 수</div><br></br>
                <button className="chart1button" onClick={Chart4}> 차트 보기 </button>
                <div className = "chart">
                <LineChart width={500} height={300} data={data4} margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="RDate" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="누적접종자수" stroke="#7ac4c0" />
                </LineChart>
                </div>
            </div>
            <br></br><br></br>
            <div>
                <div className="charttitle1" >연령대별 접종자 수</div><br></br>
                <button className="chart1button" onClick={Chart5}> 차트 보기 </button>
                <div className = "chart">
                <BarChart width={500} height={300} data={data5} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5}} barSize={30}>
                    <CartesianGrid strokeDasharray="3 3" vertical = {false}/>
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="연령대별접종자수" type = "monotone" fill="#7ac4c0"/>
                </BarChart>
                </div>
            </div>
            <br></br><br></br><br></br><br></br>
        </div>
    )
}

export default Chart;