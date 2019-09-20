import React from 'react';
import ReactDom from 'react-dom';
import logo from './trafficlight.png'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
class ViolationForm extends React.Component
{
    constructor(props)
    {
      super(props);
        this.state = {
          Type:'Speeding',
          ActionTaken:'',
          FineCharged:'',
          LicenseNum:'',
          AadharNum:'',
          Description:'',
          formvalid : false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    handleSubmit(event)
    {

        event.preventDefault();
        // if (this.state.Type === '' || this.state.ActionTaken === ''|| this.state.FineCharged === ''||
        //     this.state.LicenseNum === ''|| this.state.AadharNum === '')
        if(this.state.AadharNum == '')
        {
          alert('Please fill all mandatory fields.');
          return;
        }
        // if(isNaN(parseInt(this.state.FineCharged)))
        // {
        //   alert("Fine charged must be a number.");
        // }
        else if(isNaN(parseInt(this.state.AadharNum)) || (this.state.AadharNum).length != 12)
        {
          alert("Aadhar ID invalid.");
          return;
        }
        else
        {
          console.log(this.state.Type);
          axios.post("http://localhost:8081/ViolationEntry",this.state,{
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
        })
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
        else if (event.target.name === "aadhar") {
            this.setState({ AadharNum: event.target.value });
        }
        // else if (event.target.name === "desc") {
        //     this.setState({ Description: event.target.value });
        // }
    }

    render() {
        return(
          <div>
          <div class = "upperdivViolation upperdiv">
          <h1>Violation Entry</h1>
          </div>
          <div class = "signal">
            <img src={logo} class = "signalpic" />
          </div>
          <div class = "formdiv">
            <form onSubmit= {this.handleSubmit} name='ViolationEntry'>
             Type
             <br/>
             <br/>
               <select class="dropdownmenu" name="type" value = {this.state.Type}
                onChange = {this.handleChange}>
                <option value="Speeding">Speeding</option>
                <option value="Driving Under Influence">Driving Under Influence</option>
                <option value="Driving Without Licence">Driving Without Licence</option>
                <option value="Driving Without Insurance">Driving Without Insurance</option>

              </select>
             <br/>
             <br/>


             {/* Action Taken
             <br/>
             <br/>
             <input
              class = "inputstyle"
              type='text'
              value={this.state.ActionTaken}
              name='action'
              onChange={this.handleChange}/>
              <br/><br/> */}
              {/* Fine
             <br/>
             <br/>
             <input
                class = "inputstyle"
                type='text'
                value={this.state.fine}
                name='fine'
                onChange={this.handleChange}
              />
              <br/><br/> */}
             {/* Licence Number
             <br/>
             <br/>
             <input
              class = "inputstyle"
              type='text'
              value={this.state.LicenseNum}
              name='licence'
              onChange={this.handleChange}
              />
              <br/><br/> */}
             Aadhar Number of Violator
             <br/>
             <br/>
             <input
              class = "inputstyle"
              type='text'
              value={this.state.AadharNum}
              name='aadhar'
              placeholder = "Enter Violator's Aadhar"
              onChange={this.handleChange}
              />
              <br/><br/>
             {/* Description
             <br/>
             <br/>
             <input
              class = "inputstyle"
              type='text'
              value={this.state.Description}
              name='desc'
              onChange={this.handleChange}
              /><br/><br/><br/> */}

              <input class = "btn btn-primary" type="submit" value="Record"/>
             </form>


            </div>
            </div>
        )
    }
}
export default ViolationForm;
