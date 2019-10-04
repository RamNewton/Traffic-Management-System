//jshint esversion:9
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddUser from './pages/AddUser';
import ViolationEntry from './pages/ViolationEntry';
import DebugAddPerson from './pages/DebugAddPerson';
import DebugAddVehicle from './pages/DebugAddVehicle';
import AddAccident from './pages/AddAccident'
import DebugAddofficer from './pages/DebugAddofficer'
import DebugAddViolation from './pages/DebugAddViolation'
import AccidentReport from './pages/AccidentReport'
import './App.css';
import DebugAddLicence from './pages/DebugAddLicense';

export default function App()
{
  return(

    <Switch>
      <Route exact path = "/" component = {HomePage}/>
      <Route path = "/Login" component = {AddUser}/>
      <Route path = "/ViolationEntry" component = {ViolationEntry}/>
      <Route path = "/DebugAddPerson" component = {DebugAddPerson}/>
      <Route path = "/DebugAddVehicle" component = {DebugAddVehicle}/>
      <Route path = "/AddAccident" component = {AddAccident}/>
      <Route path="/DebugAddLicence" component={DebugAddLicence} />
      <Route path="/DebugAddofficer" component={DebugAddofficer} />
      <Route path="/DebugAddViolation" component={DebugAddViolation} />
      <Route path="/AccidentReport" component={AccidentReport} />
    </Switch>
  )
}
