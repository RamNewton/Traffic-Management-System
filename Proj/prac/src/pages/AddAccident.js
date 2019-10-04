    //jshint esversion:6
//jshint esversion:8
//jshint esversion:9
import React, {useState} from 'react';
import axios from 'axios';
import './index.css';
import logo from './trafficlight.png';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';

export default function AddAccident(props)
{
    const Initialstate = {accidentID : "", casualities : "",timeOfAccident :"",location:"",cause:"",officerInChargeID:"",lpn:""};

    const [user, setUser] = useState(Initialstate);

    function handleChange(event)
    {
        var field = event.target.name;
        var value = event.target.value;
        // console.log(event);
        // console.log(value);
        setUser({...user, [field]: value});
    }
    

    function sendToServer()
    {
        console.log(user);
        axios.post("http://localhost:8081/AccidentEntry",user,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          }).then((response) =>{
            console.log(response.data);
            if(response.data === "success")
            {
                alert("Accident recorded Successfully");
                return true;
            }
            else
            {
                alert("Failed.Try again");
                setUser({...user, password: ""});
                return false;
            }
        }).catch(error =>{
            console.log(error.response);
            alert("Contact Administrator");
        });

    }

    function AddAccident(event)
    {
        event.preventDefault();
        sendToServer();
    }

    return(
        <div>
            <div class = "upperdivViolation upperdiv">
                <h1>Add Accident</h1>
            </div>
            <div class = "signal">
                <img src={logo} className = "signalpic" />
            </div>
            <div class = "formdiv">
                <form onSubmit = {AddAccident} name = "add-accident">
                    <label>AccidentID</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "text" name = "accidentID" placeholder = "Enter AccidentID" value = {user.accidentID} onChange = {handleChange}/><br/><br/>
                    <label>number of Casualities</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "number" name = "casualities" placeholder = "no. of casualities" value = {user.casualities} onChange = {handleChange}/><br/><br/>
                  
                    <label>time of casuality</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "time" name = "timeOfAccident" placeholder = "time" value = {user.timeOfAccident} onChange = {handleChange}/><br/><br/>
                    <label>location</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "text" name = "location" placeholder = "Enter location" value = {user.location} onChange = {handleChange}/><br/><br/>
                    <label>Cause</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "text" name = "cause" placeholder = "Cause " value = {user.cause} onChange = {handleChange}/><br/><br/>               
                    <label>Officer ID</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "text" name = "officerInChargeID" placeholder = "Enter OfficerID" value = {user.officerInChargeID} onChange = {handleChange}/><br/><br/>
                    
                    <label>Licence Plate Number</label>
                    <br />
                    <br />
                    <input class="inputstyle" type="text" name="lpn" placeholder="Enter Licence Plate No" value={user.lpn} onChange={handleChange} /><br /><br />
                    <input class="btn first" type="submit" value="Enter" />
                    </form>
            </div>
        </div>
    )
}
