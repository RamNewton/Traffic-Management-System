//jshint esversion:6
//jshint esversion:8
import React from 'react';

import logo from './trafficlight.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
class DebugAddViolation extends React.Component
{
    constructor(props)
    {
      super(props);
        this.state = {
          billId:'',
          type:'',
          officerInChargeID:'',
          violatorAadhar:'',
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    handleSubmit(event)
    {

        event.preventDefault();
        // if (this.state.Type === '' || this.state.ActionTaken === ''|| this.state.FineCharged === ''||
        //     this.state.LicenseNum === ''|| this.state.AadharNum === '')
        if(this.state.AadharNum == '' && 'y'=='z')
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
          axios.post("http://localhost:8081/AddViolationEntry",this.state,{
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
            else if (response.data === "DNE")
            {
                alert("Aadhar Does Not Exist");
                // setUser({...user, password: ""});
                return false;
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
        if (event.target.name === "billId") {
            this.setState({ billId: event.target.value });
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
        else if (event.target.name === "type") {
            this.setState({ type: event.target.value });
        }
        else if(event.target.name === "  officerInChargeID")
        {
          this.setState({officerInChargeID: event.target.value });
        }
        else if (event.target.name === "officerInChargeID")
        {
          this.setState({ officerInChargeID: event.target.value });
        }
        else if (event.target.name === "violatorAadhar") {
          this.setState({ violatorAadhar: event.target.value });
        }
    
    }

    render() {
        return(
          <div>
          <div class = "upperdivViolation upperdiv">
          <h1>Add violation into Database</h1>
          </div>
          <div class = "signal">
            <img src={logo} class = "signalpic" />
          </div>
          <div class = "formdiv">
          <form onSubmit= {this.handleSubmit} name='DebugAddViolation'>
           
            Type of Violation
            <br/>
            <br/>
            <input
             class = "inputstyle"
             type='text'
             value={this.state.type}
             name='type'
             placeholder = "Enter type of offence"
             onChange={this.handleChange}
             />
             <br/><br/>
           officerInChargeID
           <br/>
           <br/>
           <input
            class = "inputstyle"
            type='number'
            value={this.state.officerInChargeID}
            name='officerInChargeID'
            placeholder = "Enter officerInChargeID"
            onChange={this.handleChange}
            />
            <br/><br/>
            violatorAadhar
            <br/>
           <br/>
           <input
            class = "inputstyle"
            type='number'
            value={this.state.violatorAadhar}
            name='violatorAadhar'
            placeholder = "Enter violatorAadhar"
            onChange={this.handleChange}
            />
            <br></br>
            <br></br>



            <input class = "btn btn-primary" type="submit" value="Add Violation "/>
</ form>
            </div>

            </div>
        )
    }
}
export default DebugAddViolation;
