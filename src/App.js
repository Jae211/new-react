/* App.js */
//각 path들을 정의해놓음
import './App.css';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Register from "./Register"
import Login from "./Login"
import Quit from "./Quit"
import Main from "./Main"
import MainHP from "./MainHP"
import Reservation from './Reservation';
import Reservation2 from './Reservation2';
import Identification from './Identification';
import Identification2 from './Identification2';
import PrintUInfo from './PrintUInfo';
import PrintRInfo from './PrintRInfo';
import PrintHPInfo from './PrintHPInfo';
import VaccHosp from './VaccHosp';
import Authenticate from './Authenticate';
import MemInfo from './MemInfo';
import PrintHPpres from './PrintHPpres';
import Currentremain from './Currentremain';
import Chart from './Chart';

function App(){
  return(
    <Router>
      <div className = "App">
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route path = "/quit">
            <Quit/>
          </Route>

          <Route exact path = "/main">
            <Main/>
          </Route>

          <Route path = "/main/HP">
            <MainHP/>
          </Route>

          <Route path = "/Bye">
            <h1 className="maintitle">GoodBye!</h1>
            <Link to ="/">
              <button className="mainbutton"> 첫 화면으로 돌아가기 </button>
            </Link>
          </Route>

          <Route exact path = "/reservation">
            <Reservation/>
          </Route>

          <Route path = "/reservation2">
            <Reservation2/>
          </Route>

          <Route path = "/identify">
            <Identification/>
          </Route>

          <Route path = "/identify2">
            <Identification2/>
          </Route>

          <Route path = "/printUInfo">
            <PrintUInfo/>
          </Route>

          <Route path = "/printRInfo">
            <PrintRInfo/>
          </Route>

          <Route path = "/printHPInfo">
            <PrintHPInfo/>
          </Route>

          <Route path = "/vaccinehosp">
            <VaccHosp/>
          </Route>

          <Route path = "/authenticate">
            <Authenticate/>
          </Route>

          <Route path = "/meminfo">
            <MemInfo/>
          </Route>

          <Route path = "/printHP_pres">
            <PrintHPpres/>
          </Route>

          <Route path = "/Currentremain">
            <Currentremain/>
          </Route>

          <Route path = "/chart">
            <Chart/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  )
}

export default App;