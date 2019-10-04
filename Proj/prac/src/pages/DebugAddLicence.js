//jshint esversion:6
//jshint esversion:8
import React from 'react';
import ReactDom from 'react-dom';
import logo from './trafficlight.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
class DebugAddLicence extends React.Component
{
    constructor(props)
    {
      super(props);
        this.state = {
       LicenceID:'',

        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    handleSubmit(event)
    {

        event.preventDefault();
        // if (this.state.Type === '' || this.state.ActionTaken === ''|| this.state.FineCharged === ''||
        //     this.state.LicenseNum === ''|| this.state.AadharNum === '')
        if(this.state.lid == '' && this.state.idate == ''&&this.state.edate == ''&&this.state.aadhar == '')
        {
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
        else
        {
          axios.post("http://localhost:8081/DebugAddLicene",this.state,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          }).then((response) =>{
            console.log(response.data);
            if(response.data === "success")
            {
                alert("Entry Successful");
                return true;
            }
            else
            {
                alert("Entry Unsuccessful");
                return false;
            }
        }).catch(error =>{
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
        if (event.target.name === "lid") {
            this.setState({ lid: event.target.value });
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
        else if (event.target.name === "idate") {
            this.setState({ idate: event.target.value });
        }
        else if(event.target.name === "edate")
        {
          this.setState({ edate: event.target.value });
        }
        else if(event.target.name === "aadhar")
        {
          this.setState({ aadhar: event.target.value });
        }
    }

    render() {
        return(
          <div>
          <div class = "upperdivViolation upperdiv">
          <h1>Add Licence into Database</h1>
          </div>
          <div class = "signal">
            <img src={logo} class = "signalpic" />
          </div>
          <div class = "formdiv">
          <form onSubmit= {this.handleSubmit} name='DebugAddLicence'>
           Licene ID
           <br/>
           <br/>
           <input
            class = "inputstyle"
            type='number'
            value={this.state.lid}
            name='lid'
            placeholder = "Enter LicenceID"
            onChange={this.handleChange}
            />
            <br/><br/>
            Licence Issuedate
            <br/>
            <br/>
            <input
             class = "inputstyle"
             type='date'
             value={this.state.idate}
             name='idate'
             placeholder = "Enter issuedate"
             onChange={this.handleChange}
             />
             <br/><br/>
          License Expirydate
           <br/>
           <br/>
           <input
           class = "inputstyle"
           type='date'
           value={this.state.edate}
           name='edate'
           placeholder = "Enter Expiry date"
           onChange={this.handleChange}/> <br/><br/>
           <br/><br/>
           Aadhar number
            <br/>
            <br/>
            <input
            class = "inputstyle"
            type='number'
            value={this.state.aadhar}
            name='aadhar'
            placeholder = "Enter aadhar number"
            onChange={this.handleChange}/> <br/><br/>



            <input class = "btn btn-primary" type="submit" value="Add License "/>
</ form>
            </div>

            </div>
        )
    }
}
export default DebugAddLicence;
