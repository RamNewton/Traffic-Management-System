//jshint esversion:6
//jshint esversion:8
import React from 'react';
import ReactDom from 'react-dom';
import logo from './trafficlight.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
class DebugAddofficer extends React.Component
{
    constructor(props)
    {
      super(props);
        this.state = {
          officerId:'',
          pwh:'',
          designation:'',
          Aadhar:'',
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
          axios.post("http://localhost:8081/DebugAddViolation",this.state,{
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
        if (event.target.name === "officerId") {
            this.setState({ officerId: event.target.value });
        }
   
        else if (event.target.name === "pwh") {
            this.setState({ pwh: event.target.value });
        }
        else if(event.target.name === "  designation")
        {
          this.setState({designation: event.target.value });
        }
        else if(event.target.name === "Aadhar")
        {
          this.setState({ Aadhar: event.target.value });
        }
    
    }

    render() {
        return(
          <div>
          <div class = "upperdivViolation upperdiv">
          <h1>Add officer into Database</h1>
          </div>
          <div class = "signal">
            <img src={logo} class = "signalpic" />
          </div>
          <div class = "formdiv">
          <form onSubmit= {this.handleSubmit} name='DebugAddofficer'>
           officerId
           <br/>
           <br/>
           <input
            class = "inputstyle"
            type='number'
            value={this.state.officerId}
            name='officerId'
            placeholder = "Enter officerid"
            onChange={this.handleChange}
            />
            <br/><br/>
            passwordhash
            <br/>
            <br/>
            <input
             class = "inputstyle"
             type='text'
             value={this.state.pwh}
             name='pwh'
             placeholder = "Enter type of passwor hash"
             onChange={this.handleChange}
             />
             <br/><br/>
           designation
           <br/>
           <br/>
           <input
            class = "inputstyle"
            type='number'
            value={this.state.designation}
            name='designation'
            placeholder = "Enter designation"
            onChange={this.handleChange}
            />
            <br/><br/>
            aadhar
            <br/>
           <br/>
           <input
            class = "inputstyle"
            type='number'
            value={this.state.Aadhar}
            name='Aadhar'
            placeholder = "Enter Aadhar"
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
export default DebugAddofficer;
