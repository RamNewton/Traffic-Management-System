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

export default function addAccident(props)
{
    const Initialstate = {accid : "", cas : "",time :"",location:"",cause:"",officerid:""};

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

    function addAccident(event)
    {
        event.preventDefault();
        sendToServer();
    }

    return(
        <div>
            <div class = "upperdivViolation upperdiv">
                <h1>Officer Login</h1>
            </div>
            <div class = "signal">
                <img src={logo} className = "signalpic" />
            </div>
            <div class = "formdiv">
                <form onSubmit = {addUser} name = "add-accident">
                    <label>AccidentID</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "text" name = "id" placeholder = "Enter AccidentID" value = {user.accid} onChange = {handleChange}/><br/><br/>
                    <label>number of Casualities</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "number" name = "cas" placeholder = "no. of casualities" value = {user.cas} onChange = {handleChange}/><br/><br/>
                  
                    <label>time of casuality</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "time" name = "time" placeholder = "time" value = {user.time} onChange = {handleChange}/><br/><br/>
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
                    <input class = "inputstyle" type = "text" name = "officer" placeholder = "Enter OfficerID" value = {user.uname} onChange = {handleChange}/><br/><br/>
                    <input class = "btn first" type = "submit" value = "Enter"/>
                    </form>
            </div>
        </div>
    )
}
