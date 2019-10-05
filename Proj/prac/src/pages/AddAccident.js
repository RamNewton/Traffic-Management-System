//jshint esversion:6
//jshint esversion:8
import React from 'react';

import logo from './trafficlight.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
class AddAccident extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accid: '',
            cas: '',
            time: '',
            location: '',
            cause:'',
            uname:'',
            lpn:''

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(event) {

        event.preventDefault();
        // if (this.state.Type === '' || this.state.ActionTaken === ''|| this.state.FineCharged === ''||
        //     this.state.LicenseNum === ''|| this.state.AadharNum === '')
        if (this.state.AadharNum == '' && 'y' == 'z') {
            alert('Please fill all mandatory fields.');
            return;
        }
        // if(isNaN(parseInt(this.state.FineCharged)))
        // {
        //   alert("Fine charged must be a number.");
        // }
        // else if(isNaN(parseInt(this.state.AadharNum)) || (this.state.AadharNum).length != 12)
        // {
        //   alert("Aadhar ID invalid.");
        //   return;
        // }
        else {
            axios.post("http://localhost:8081/AccidentEntry", this.state, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((response) => {
                console.log(response.data);
                if (response.data === "success") {
                    alert("Entry Successful");
                    return true;
                }
                else if (response.data === "DNE") {
                    alert("Aadhar Does Not Exist");
                    // setUser({...user, password: ""});
                    return false;
                }
                else {
                    alert("Entry Unsuccessful");
                    return false;
                }
            }).catch(error => {
                console.log(error.response);
                alert("Entry Unsuccessful. Contact Admin");
            });
        }
        // if(isNaN(parseInt(this.state.LicenseNum)))
        // {
        //   alert("License ID must be a number.");
        // }
    }

    handleChange(event) {
        if (event.target.name === "accid") {
            this.setState({ accid: event.target.value });
        }
        else if (event.target.name === "cas") {
            this.setState({ cas: event.target.value });
        }
        else if (event.target.name === "time") {
            this.setState({ time: event.target.value });
        }
        else if (event.target.name === "location") {
            this.setState({ location: event.target.value });
        }
        else if (event.target.name === "cause") {
            this.setState({ cause: event.target.value });
        }
        else if (event.target.name === "officer") {
            this.setState({ uname: event.target.value });
        }
        else if (event.target.name === "lpn") {
            this.setState({ lpn: event.target.value });
        }

    }

    render() {
        return (
            <div>
                <div class="upperdivViolation upperdiv">
                    <h1>Officer Login</h1>
                </div>
                <div class="signal">
                    <img src={logo} className="signalpic" />
                </div>
                <div class="formdiv">
                    <form onSubmit={this.handleSubmit} name="AddAccident">
                        <label>AccidentID</label>
                        <br />
                        <br />
                        <input class="inputstyle" type="number" name="accid" placeholder="Enter AccidentID" value={this.state.accid} onChange={this.handleChange} /><br /><br />
                        <label>number of Casualities</label>
                        <br />
                        <br />
                        <input class="inputstyle" type="number" name="cas" placeholder="no. of casualities" value={this.state.cas} onChange={this.handleChange} /><br /><br />

                        <label>time of casuality</label>
                        <br />
                        <br />
                        <input class="inputstyle" type="date" name="time" placeholder="time" value={this.state.time} onChange={this.handleChange} /><br /><br />
                        <label>location</label>
                        <br />
                        <br />
                        <input class="inputstyle" type="text" name="location" placeholder="Enter location" value={this.state.location} onChange={this.handleChange} /><br /><br />
                        <label>Cause</label>
                        <br />
                        <br />
                        <input class="inputstyle" type="text" name="cause" placeholder="Cause " value={this.state.cause} onChange={this.handleChange} /><br /><br />
                        <label>Officer ID</label>
                        <br />
                        <br />
                        <input class="inputstyle" type="text" name="officer" placeholder="Enter OfficerID" value={this.state.uname} onChange={this.handleChange} /><br /><br />
                        <label>Licence Plate No</label>
                        <br />
                        <br />
                        <input class="inputstyle" type="text" name="lpn" placeholder="Enter Licence Plate No" value={this.state.lpn} onChange={this.handleChange} /><br /><br />
                        <input class="btn first" type="submit" value="Enter" />
                    </form>
                </div>
            </div>
        )
    }
}
export default AddAccident;
