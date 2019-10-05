import React from 'react';

import logo from './trafficlight.png';
import './index.css';
import { Redirect } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class MostWanted extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            table: '',
            redirect: false
        };



        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }



    handleSubmit(event) {

        event.preventDefault();
        axios.post("http://localhost:8081/MostWanted", this.state, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }).then((response) => {
            var table = ''

            for (var i = 0; i < response.data.length; i++) {
                table += '<tr><td>' + (i + 1) + '</td><td>' + response.data[i].firstname + '</td><td>' + response.data[i].lastname + '</td><td>' + response.data[i].mobNumber + '</td><td>' + response.data[i].c + '</td>';
                // res[i]. + '</td></tr>';
            }
            table = '<table border="1"><tr><th>S.No.</th><th>First Name</th><th>Last Name</th><th>mobNumber</th><th>Violations count</th></tr>' + table + '</table>';
            this.setState({ table: table })
        }).catch(error => {
            console.log(error.response);
            alert("Entry Unsuccessful. Contact Admin");
        });

    }


    handleChange(event) {
        if (event.target.name === "startDate") {
            this.setState({ startDate: event.target.value });
        }
        else if (event.target.name === "endDate") {
            this.setState({ endDate: event.target.value });
        }


    }


    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Login' />
        }
    }
    render() {
        return (
            <div>
                <div class="upperdivViolation upperdiv">
                    <h1>Citizens Violation Count</h1>
                </div>
                <div class="signal">
                    <img src={logo} class="signalpic" />
                </div>
                <div class="formdiv">
                    <form onSubmit={this.handleSubmit} name='AccidentReport'>
                        
                        <div> {ReactHtmlParser(this.state.table)} </div>


                        <input class="btn btn-primary" type="submit" value="Citizens Violation Count" />


                    </ form>
                    {/* {this.renderRedirect()}
                    <button onClick={this.setRedirect} class="Button">Register</button> */}

                </div>

            </div>
        )
    }
}
export default MostWanted;