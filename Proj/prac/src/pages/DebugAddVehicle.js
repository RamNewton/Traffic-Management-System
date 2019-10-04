//jshint esversion:6
//jshint esversion:8
import React from 'react';
import ReactDom from 'react-dom';
import logo from './trafficlight.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
class DebugAddVehicleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            VehicleModel: '',
            LicencePlateNo: '',
            Insured: '',
            PollCheck: '',
            AadharNum: '',
            VehicleManufacturer: '',
            formvalid: false
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
            axios.post("http://localhost:8081/DebugAddVehicle", this.state, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((response) => {
                console.log(response.data);
                if (response.data === "success") {
                    alert("Entry Successful");
                    return true;
                } else if (response.data === "DNE") {
                    alert("Aadhar Does Not Exist");
                    // setUser({...user, password: ""});
                    return false;
                } else {
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
        if (event.target.name === "type") {
            this.setState({ Type: event.target.value });
        }
        // else if (event.target.name === "action") {
        //     this.setState({ ActionTaken: event.target.value });
        // }
        // else if (event.target.name === "fine") {
        //     this.setState({ FineCharged: event.target.value });
        // }
        // else if (event.target.name === "licence") {
        //     this.setState({ LicenseNum: event.target.value });
        // }
        // else if (event.target.name === "aadhar") {
        //     this.setState({ AadharNum: event.target.value });
        // }
        // else if (event.target.name==="insured") {
        //     console.log("insured");
        // }
        // else if (event.target.name==="pollcheck") {
        //     console.log("pollutionchecked");
        // }
        // else if (event.target.name === "desc") {
        //     this.setState({ Description: event.target.value });
        // }
        else if (event.target.name === "lpn") {
            this.setState({ LicencePlateNo: event.target.value });
        } else if (event.target.name === "model") {
            this.setState({ VehicleModel: event.target.value });
        } else if (event.target.name === "insured") {
            this.setState({ Insured: 'Y' });
        } else if (event.target.name === "pollcheck") {
            this.setState({ PollCheck: event.target.value });
        }
    }

    render() {
        return (
<div>
    <div class="upperdivViolation upperdiv">
        <h1> Add Vehicle into Database </h1> </div>
    <div class="signal">
        <img src={ logo } class="signalpic" />
    </div>
    <div class="formdiv">
        <form onSubmit={ this.handleSubmit } name='DebugAddVehicle'>
            Licence Plate No
            <br/>
            <br/>
            < input class="inputstyle" type='number' value={ this.state.LicencePlateNo } name='lpn' placeholder="Enter LicencePlateNo" onChange={ this.handleChange } />
            <br/>
            <br/> Vehicle Model
            < br />
            <br/>
            < input class="inputstyle" type='text' value={ this.state.VehicleModel } name='model' placeholder="Enter Model of Vehicle" onChange={ this.handleChange } />
            <br/>
            <br/> Insurance and Pollution Check
            <br/>
            <br/>
            < input class="inputstyle" type='checkbox' value={ this.state.Insured } name='insured' /> Select if Insured
            <br/>
            <br/>
            < input class="inputstyle" type='checkbox' value={ this.state.PollCheck } name='pollcheck' /> Select if Pollution Check is Done
            <br/>
            <br/>
             Aadhar
            <br/>
            <br/>
            < input class="inputstyle" type='text' value={ this.state.AadharNum } name='model' placeholder="Enter Model of Vehicle" onChange={ this.handleChange } /> 
                        <br />
                        <br />
            Vehicle Manufacturer
            <br/>
            <br/>
            < input class="inputstyle" type='text' value={ this.state.VehicleManufacturer } name='model' placeholder="Enter Model of Vehicle" onChange={ this.handleChange } />
                        <br />
                        <br />
                        < input class="btn btn-primary" type="submit" value="Add Person " />
        </form>
    </div>

</div>
        )
    }
}
export default DebugAddVehicleForm;