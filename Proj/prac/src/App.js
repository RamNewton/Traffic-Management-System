//jshint esversion:9
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddUser from './pages/AddUser';
import ViolationEntry from './pages/ViolationEntry';
import DebugAddPerson from './pages/DebugAddPerson';
import DebugAddVehicle from './pages/DebugAddVehicle';
import AddAccident from './pages/AddAccident'
import './App.css';

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
    </Switch>
  )
}
