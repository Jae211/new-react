/* server.js */
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(express.json());        //data grab 위해 사용 (front->back)
app.use(cors());

const db = mysql.createConnection({
    host : "localhost",
    user:"root",
    password:"sally1926*",
    database : "vaccine_reservation", //사용할 데이터베이스
});

/* 
 * 목적 : 회원가입
 * input : 이름, 주민번호, 나이, 성별, 번호, 접종여부
 * output : "실패" / "성공"
 * 사용한 query : INSERT
 */
app.post("/register", (req, res) => {
    const username = req.body.username  //body.뒤의 이름이 regist.js에서의 Axios.post 안의 이름과 같아야 함
    const password = req.body.password
    const age = req.body.age
    const sex = req.body.sex
    const phonenum = req.body.phonenum
    const vaccined = req.body.vaccined

    db.query("INSERT INTO user (UName, Ssn, Age, Sex, PNum, Shot_Num) VALUES (?,?,?,?,?,?)", 
    [username, password, age, sex, phonenum, vaccined],
    (err, result)=>{
        if(err){        //쿼리에서 에러가 일어난 경우
            res.send({message: "실패"});
            console.log(err);
        }   //else문 사용하지 않아도 됨. res.send해서 끝나니까.
        if(result){
            res.send({message: "성공"});
            console.log(result);
        }
    });
});


/*
 * 목적 : 로그인
 * input : 이름, 주민번호
 * output : user에 대한 정보 / "아이디 또는 비밀번호가 틀렸습니다!"
 * 사용한 query : SELECT
 */
app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM user WHERE UName = ? AND Ssn = ?", 
    [username, password],
    (err, result) => {
        if(err){
            console.log("실패");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("로그인 성공");
            res.send(result);
        } else{
            console.log("로그인 실패");
            res.send({message: "아이디 또는 비밀번호가 틀렸습니다!"});
        }
    });
});


/*
 * 목적 : 로그인 시 병원장인지 판단
 * input : 주민번호
 * output : "일반 회원" / "병원장"
 * 사용한 query : SELECT
 */
app.post("/login2", (req, res) => {
    const password = req.body.password

    db.query("SELECT * FROM hospital WHERE PSsn = ?",
    [password],
    (err, result) => {
        if(err){
            console.log("login2 실패");
            res.send({err: err})
        }
        if(result.length <= 0){
            console.log("general mem");
            res.send({message: "일반 회원"});
        }
        else{
            console.log("hosp president");
            res.send({message: "병원장"});
        }
    });
});


/*
 * 목적 : 회원 탈퇴
 * input : 이름, 주민번호
 * output : "정보없음" / "quit succeed!"
 * 사용한 query : SELECT, COUNT, INSERT, DELETE
 */
app.post("/quit", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM user WHERE UName = ? AND Ssn = ?", 
    //입력받은 회원이 user table 내에 존재하는지 판단하는 query
    [username, password],
    (err, result) => {
        if(err){
            console.log(err);
        }
        if(result.length <= 0){
            console.log("정보 없음");
            res.send({message: "정보 없음"});
        }
        else{
            db.query("SELECT COUNT(*) as DM FROM reservation_info WHERE Ssn = ?",
            //회원의 예약 개수를 세는 query
            [password],
            (err, result) => {
                 console.log("예약 개수 확인중");
                if(err){
                    console.log("예약 개수 확인 실패");
                    res.send({err: err})
                }
                else{ 
                    console.log(result[0].DM);
                    var data_num = result[0].DM;
                    var data_RNum = new Array();

                    db.query("SELECT RNum FROM reservation_info WHERE Ssn = ?",
                    //회원의 모든 예약 번호를 SELECT 하는 query
                    [password],
                    (err, result) => {
                    console.log("예약 번호 확인중");
                    if(err){
                        console.log("예약 번호 확인 실패");
                        res.send({err: err})
                    }
                    if(result){
                        console.log(result);
                        for(let i=0;i<data_num;i++){
                            data_RNum.push(result[i].RNum);  //예약번호를 배열에 저장
                        }
                        for(let i=0;i<data_num;i++){         //예약 개수만큼 반복
                            db.query("SELECT * FROM reservation_info WHERE RNum = ?",
                            //reservation_info table에서 사용자의 예약정보를 SELECT하는 query 
                            [data_RNum[i]],
                            (err, result) => {
                                console.log("예약 번호 정보 불러오기");
                                if(err){
                                    console.log("예약 번호 정보 불러오기 실패");
                                    res.send({err: err})
                                }
                                if(result){
                                    console.log(result);
                                    const Carry_UName=result[0].UName;
                                    const Carry_Ssn=result[0].Ssn;
                                    const Carry_Age=result[0].Age;
                                    const Carry_HName=result[0].HName;
                                    const Carry_RDate=result[0].RDate;
                                    const Carry_RTime=result[0].RTime;
                                    //삭제될 예약 정보를 임시로 저장

                                    console.log(Carry_RDate);
                                    db.query("INSERT INTO deleted_info VALUES(?,?,?,?,?,?,?)",
                                    //deleted_info table에 삭제된 예약정보를 저장하는 query
                                    [data_RNum[i],Carry_UName,Carry_Ssn,Carry_Age,Carry_HName,Carry_RDate,Carry_RTime],
                                    (err, result) => {
                                        console.log("예약 정보 deleted_info에 삽입 실행");
                                        if(err){
                                            console.log("예약 정보 deleted_info에 삽입 실패");
                                            res.send({err: err})
                                        }
                                        if(result){
                                        console.log(result);
                                        }
                                    });
                                }                            
                            });
                            db.query("DELETE FROM reservation_info WHERE RNum = ?",
                            //reservation_info table에서 정보를 삭제하는 query
                            [data_RNum[i]],
                            (err, result) => {
                                console.log("예약 정보 delete 실행");
                                if(err){
                                    console.log("예약 정보 delete 실패");
                                    res.send({err: err})
                                }
                                if(result){
                                    console.log(result);
                                }                            
                            });
                        }
                    }
                    });       
                }
            })   
            db.query("DELETE FROM user WHERE UName = ? AND Ssn = ?",
            //회원 정보를 user table에서 삭제하는 query
            [username, password],
            (err, result) => {
                console.log("delete 실행");
                if(err){
                    console.log("실패");
                    res.send({err: err})
                }
                if(result){
                    console.log(result);
                    res.send({message: "quit succeed!"});   
                }
            });
        }
    })    
})


/*
 * 목적 : 백신접종 예약 전 접종 대상자인지 확인
 * input : 이름, 주민번호
 * output : "접종 대상자 아님" / "접종 대상자"
 * 사용한 query : SELECT
 */
app.post("/shotnumtest", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT Shot_Num FROM user WHERE UName = ? AND Ssn = ?",
    [username, password],
    (err, result) => {
        console.log("사용자 접종여부 확인 중");
        if(err){
            console.log("사용자 접종여부 확인 실패");
            res.send({err: err});
        }
        else{
            console.log(result);
            console.log(result[0].Shot_Num);
            if(result[0].Shot_Num > 1){
                console.log("접종 대상자가 아님");
                res.send({message: "접종 대상자 아님"})
            }
            else{
                res.send({message: "접종 대상자"})
            }
        }
    })
});


/*
 * 목적 : 백신접종 예약
 * input : 이름, 주민번호, 나이, 병원이름, 날짜, 시간
 * output : "예약 성공!"
 * 사용한 query : INSERT, UPDATE
 */
app.post("/reserv2", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const age = req.body.age
    const hospital = req.body.hospital
    const date = req.body.date
    const time = req.body.time
    console.log("hosp");
    console.log(hospital);
    db.query("INSERT INTO reservation_info (UName, Ssn, Age, HName, RDate, RTime) VALUES (?,?,?,?,?,?)", 
    //rservation_info table에 입력받은 정보를 INSERT하는 query
    [username, password, age, hospital, date, time],
    (err, result)=>{
        console.log("예약 정보 저장 중");
        if(err){
            console.log("예약 정보 저장 실패");
            res.send({err: err})
        }
        else{
            console.log(result);
            db.query("UPDATE hospital SET Remain = Remain-1 WHERE HName = ?",
            //병원의 잔여백신 수를 줄이는 query
            [hospital],
            (err, result) => {
                console.log("병원 잔여백신 수정 진행중");
                if(err){
                    console.log("병원 잔여백신 수정 실패");
                    res.send({err: err})
                }
            });
            db.query("UPDATE user SET Shot_Num = Shot_Num+1 WHERE Ssn = ?",
            //해당 user의 접종 정보를 UPDATE하는 query
            [password],
            (err, result) => {
                console.log("사용자 정보 수정 진행중");
                if(err){
                    console.log("사용자 정보 수정 실패");
                    res.send({err: err})
                }
                else{
                    console.log(result);
                    res.send({message: "예약 성공!"});
                }
            })
        }
    })
});


/*
 * 목적 : DB에서 병원주소 중 '시' 정보를 SELECT
 * input : X
 * output : 시
 * 사용한 query : SELECT, DISTINCT
 */
app.post("/getSi", (req, res) => {
    db.query("SELECT DISTINCT Si FROM hospital",
    (err, result) => {
        if(err){
            console.log("실패");
            console.log(err);
        }
        if(result){
            console.log("결과");
            console.log(result);
            res.send(result);
        }
    })
})


/*
 * 목적 : 입력받은 시에 대한 구 정보 출력
 * input : 시
 * output : 구
 * 사용한 query : SELECT DISTINCT
 */
app.post("/getGu", (req, res) => {
    const Si = req.body.Si

    db.query("SELECT DISTINCT Gu FROM hospital WHERE Si = ?",
    [Si],
    (err, result) => {
        if(err){
            console.log("실패");
            console.log(err);
        }
        if(result){
            console.log("결과");
            console.log(result);
            res.send(result);
        }
    })
})


/*
 * 목적 : 입력받은 구에 대한 동 정보 출력
 * input : 시, 구
 * output : 동
 * 사용한 query : SELECT DISTINCT
 */
app.post("/getDong", (req, res) => {
    const Si = req.body.Si;
    const Gu = req.body.Gu;

    db.query("SELECT DISTINCT Dong FROM hospital WHERE Si = ? AND Gu = ?",
    [Si, Gu],
    (err, result) => {
        if(err){
            console.log("실패");
            console.log(err);
        }
        if(result){
            console.log("결과");
            console.log(result);
            res.send(result);
        }
    })
})


/*
 * 목적 : 입력받은 주소에 속한 병원정보 출력
 * input : 시, 구, 동
 * output : 병원 이름, 잔여백신 수
 * 사용한 query : SELECT
 */
app.post("/getHosp", (req, res) => {
    const Si = req.body.Si;
    const Gu = req.body.Gu;
    const Dong = req.body.Dong;

    db.query("SELECT HName, Remain FROM hospital WHERE Si = ? AND Gu = ? AND Dong = ? AND Remain > 0",
    [Si, Gu, Dong],
    (err, result) => {
        if(err){
            console.log("실패");
            console.log(err);
        }
        if(result){
            console.log("결과");
            console.log(result);
            res.send(result);
        }
    })
})


/*
 * 목적 : 예약정보 출력 전 본인인증
 * input : 이름, 주민번호
 * output : 예약정보 / "Identification failed!"
 * 사용한 query : SELECT
 */
app.post("/identify2", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM reservation_info WHERE UName = ? AND Ssn = ?", 
    [username, password],
    (err, result) => {
        if(err){
            console.log("실패");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("본인 인증 성공");
            console.log(result);
            res.send(result);
        } else{
            console.log("본인 인증 실패");
            res.send({message: "Identification failed!"});
        }
    });
});


/*
 * 목적 : 예약정보 출력 시 병원 상세정보 출력
 * input : 병원 이름
 * output : 병원 상세정보 / "병원 정보 없음!"
 * 사용한 query : SELECT
 */
app.post("/hinfo", (req, res) => {
    const HName = req.body.HName

    db.query("SELECT * FROM hospital WHERE HName = ?",
    [HName],
    (err, result) => {
        if(err){
            console.log("실패");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("병원 정보 출력");
            console.log(result);
            res.send(result);
        } else{
            console.log("병원 존재 안함");
            res.send({message: "병원 정보 없음!"});
        }
    });
});


/*
 * 목적 : 접종을 해본 병원 리스트 출력
 * input : X
 * output : 병원 이름, 주소, 전화번호
 * 사용한 query : SELECT, CONCAT, IN, DISTINCT, subquery, UNION
 */
app.post("/vaccinehosp", (req, res) => {
    db.query("SELECT H.HName, CONCAT(H.Si, ' ', H.Gu, ' ', H.Dong) AS Addr, H.HNum FROM hospital as H WHERE H.HName IN ( SELECT DISTINCT R.HName FROM reservation_info AS R UNION SELECT DISTINCT D.HName FROM deleted_info AS D)",
    (err, result) => {
        if(err){
            console.log("실패");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("안심병원 출력");
            console.log(result);
            res.send(result);
        } else{
            console.log("안심병원 정보 없음");
            res.send({message: "안심병원 정보 없음!"});
        }
    });
});


/*
 * 목적 : 병원장 인증 후 예약정보 출력
 * input : 주민번호, 병원이름
 * output : 해당 병원의 예약정보 / "본인 인증 실패!"
 * 사용한 query : SELECT
 */
app.post("/authenticate", (req, res) => {
    const name = req.body.username
    const password = req.body.password
    const HName = req.body.hospital
    
    db.query("SELECT * FROM user AS U, hospital AS H WHERE U.Ssn=H.Pssn AND U.UName=? AND H.Pssn=?",
    //병원장이 맞는지 판단하는 query
    [name, password],
    (err, result) => {
        if(err){
            console.log("본인인증 실패");
            res.send({err: err})
        }
        if(result.length <= 0){
            res.send({message: "본인 인증 실패!"});
        }
        else{
            db.query("SELECT * FROM reservation_info WHERE HName = ?", 
            //해당 병원에 속하는 예약정보를 SELECT 하는 query
            [HName],
            (err, result) => {
                if(err){
                    console.log("실패");
                    res.send({err: err})
                }
                if(result.length > 0){
                    console.log(result);
                    res.send(result);
                }
                else{
                    res.send({message: "본인 인증 실패!"});
                }
            });
        }
    });
});


/*
 * 목적 : 병원장 리스트 출력
 * input : X
 * output : 병원장 이름, 전화번호, 병원 이름 / "병원장 정보 없음"
 * 사용한 query : SELECT, inner join
 */
app.post("/otherhp", (req, res) => {     //다른 병원장 출력
    db.query("SELECT U.UName, U.PNum, H.HName FROM user AS U, hospital AS H WHERE U.Ssn=H.Pssn",
    (err, result) => {
        if(err){
            console.log("쿼리 연산 실패");
            res.send({err: err})
        }
        console.log(result);
        if(result.length > 0){
            res.send(result);
        }
        else{
            console.log("병원장 정보 없음");
            res.send({message: "병원장 정보 없음"});
        }
    });
});


/*
 * 목적 : 전체 병원 별 잔여백신 출력
 * input : X
 * output : 병원이름, 잔여백신 / "병원별 잔여 백신 현황 불러오기 실패!"
 * 사용한 query : SELECT
 */
app.post("/currentremain", (req, res) => {
    db.query("SELECT HName, Remain FROM hospital", 
    (err, result) => {
        if(err){
            console.log("병원별 잔여 백신 현황 불러오기 실패");
            res.send({message: "병원별 잔여 백신 현황 불러오기 실패!"});
        }
        else{  
            console.log("병원별 잔여 백신 현황 불러오기 성공");
            res.send(result);
        }
    });
})


/*
 * 목적 : 병원 잔여백신 추가
 * input : 병원 이름
 * output : "백신개수 추가 성공!"
 * 사용한 query : UPDATE
 */
app.post("/ordervaccine", (req, res) => {
    const HName = req.body.HName
    
    db.query("UPDATE hospital SET Remain = Remain+10 WHERE HName = ?",
    [HName],
    (err, result) => {
        console.log("백신개수 추가 진행중");
        if(err){
            console.log("백신개수 추가 실패");
            res.send({err: err})
        }
        else{ 
            res.send({message: "백신개수 추가 성공!"});
        }
    });
});


/*
 * 목적 : 확진자 chart
 * input : X
 * output : 날짜, 확진자 수 / "확진자 정보 불러오기 실패!"
 * 사용한 query : SELECT
 */
app.post("/chart", (req, res) => {
    db.query("SELECT * FROM confirmed_count", 
    (err, result) => {
        if(err){
            console.log("확진자 정보 불러오기 실패");
            res.send({message: "확진자 정보 불러오기 실패!"});
        }
        else{  
            console.log("확진자 정보 불러오기 성공");
            res.send(result);
        }
    });
})


/*
 * 목적 : 누적 확진자 chart
 * input : X
 * output : 날짜, 날짜별 누적 확진자 수 / "누적 확진자 정보 불러오기 실패!"
 * 사용한 query : SELECT, OVER, SUM, AS
 */
app.post("/chart2", (req, res) => {
    db.query("SELECT confirmed_count.*, sum(확진자수) over(order by CDate) AS 누적확진자수 FROM confirmed_count", 
    (err, result) => {
        if(err){
            console.log("누적 확진자 정보 불러오기 실패");
            res.send({message: "누적 확진자 정보 불러오기 실패!"});
        }
        else{  
            console.log("누적 확진자 정보 불러오기 성공");
            res.send(result);
        }
    });
})


/*
 * 목적 : 일별 접종자 chart 
 * input : X
 * output : 날짜, 날짜별 접종자 수 / "일별 접종자 정보 불러오기 실패!"
 * 사용한 query : SELECT, COUNT, GROUP BY, ORDER BY, AS
 */
app.post("/chart3", (req, res) => {
    db.query("WITH temp(RDate, RNum) AS (SELECT RDate, RNum FROM deleted_info UNION SELECT RDate, RNum FROM reservation_info ORDER BY RDate) SELECT date_format(RDate,'%m.%d') AS RDate, COUNT(RNum) AS 일별접종자수 FROM temp GROUP BY RDate ORDER BY RDate", 
    (err, result) => {
        if(err){
            console.log("일별 접종자 정보 불러오기 실패");
            res.send({message: "일별 접종자 정보 불러오기 실패!"});
        }
        else{  
            console.log("일별 접종자 정보 불러오기 성공");
            res.send(result);
        }
    });
})


/*
 * 목적 : 누적 접종자수 chart
 * input : X
 * output : 날짜, 날짜별 누적 접종자 수 / "누적 접종자 정보 불러오기 실패!"
 * 사용한 query : SELECT, SUM, OVER, AS
 */
app.post("/chart4", (req, res) => {
    db.query("SELECT Shot_count.*, sum(일별접종자수) over(order by RDate) AS 누적접종자수 FROM Shot_count", 
    (err, result) => {
        if(err){
            console.log("누적 접종자 정보 불러오기 실패");
            res.send({message: "누적 접종자 정보 불러오기 실패!"});
        }
        else{  
            console.log("누적 접종자 정보 불러오기 성공");
            res.send(result);
        }
    });
})


/*
 * 목적 : 연령대별 접종자수 chart
 * input : X
 * output : 연령대, 연령대별 접종자 수 / "연령대별 접종자 정보 불러오기 실패!"
 * 사용한 query : SELECT, COUNT, GROUP BY, ORDER BY, AS, Subquery
 */
app.post("/chart5", (req, res) => {
    db.query("select age , count(*) as 연령대별접종자수 from ( select floor( age / 10) * 10 as age from reservation_info) o group by age order by age;", 
    (err, result) => {
        if(err){
            console.log("연령대별 접종자 정보 불러오기 실패");
            res.send({message: "연령대별 접종자 정보 불러오기 실패!"});
        }
        else{  
            console.log("연령대별 접종자 정보 불러오기 성공");
            res.send(result);
        }
    });
})

const port = 3001;
app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
});