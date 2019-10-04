//jshint esversion:6
//jshint esversion:8
import ReactHtmlParser from 'react-html-parser';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
var table = '';
export default function HomePage(props) {
        
        var jsonString;
    const initialState = {
        aadhar: '',
        firstname: '',
        lastname: '',
        dob: '',
        Email: '',
        PINcode: '',
        mobNumber: '',
        email: '',
        licenseID: ''
    };

    const [user, setUser] = useState(initialState);

    async function getData() {
        // setUser({...user, uname: "no"});
        await axios.get("http://localhost:8081/GenerateAccidentReport").then(response => {
            console.log(response);
            
            setUser(response.data[0]);
            
            for (var i = 0; i < response.data.length; i++) {
                table += '<tr><td>' + (i + 1) + '</td><td>' + response.data[i].aadhar + '</td><td>' + response.data[i].email + '</td><td>';
                // res[i]. + '</td></tr>';
            }
            table = '<table border="1"><tr><th>S.No.</th><th>Event id</th><th>Participant id</th><th>Place</th></tr>' + table + '</table>';
        }).catch(error => {
            console.log(error);
        });
        // var table = '';

        
    }
    // var test = '<h1>Test</h1>';
    return (
        <div>
            <h1> {user.email} </h1>
            
            <div> {ReactHtmlParser(table)} </div>
            <button onClick={getData}>Click Here</button>
            {/* Licence Issuedate
            <br />
            <br />
            <input
                class="inputstyle"
                type='date'
                value={this.state.idate}
                name='idate'
                placeholder="Enter issuedate"
                onChange={this.handleChange}
            /> */}
        </div>
        
    )
}
