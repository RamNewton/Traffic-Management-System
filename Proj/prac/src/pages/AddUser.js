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

export default function AddUser(props)
{
    const Initialstate = {uname : "", password : ""};

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
        axios.post("http://localhost:8081/Login",user,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          }).then((response) =>{
            console.log(response.data);
            if(response.data === "success")
            {
                alert("Login Successful");
                return <Redirect to='/DebugAddViolation'/>
            }
            else
            {
                alert("Login Faliure");
                setUser({...user, password: ""});
                return false;
            }
        }).catch(error =>{
            console.log(error.response);
            alert("Check Credentials");
        });

    }

    function addUser(event)
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
                <form onSubmit = {addUser} name = "user-form">
                    <label>OfficerID</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "text" name = "uname" placeholder = "Enter OfficerID" value = {user.uname} onChange = {handleChange}/><br/><br/>
                    <label>Password</label>
                    <br/>
                    <br/>
                    <input class = "inputstyle" type = "password" name = "password" placeholder = "Password" value = {user.password} onChange = {handleChange}/><br/><br/>
                    <input class = "btn first" type = "submit" value = "Login"/>

                </form>
            </div>
        </div>
    )
}
