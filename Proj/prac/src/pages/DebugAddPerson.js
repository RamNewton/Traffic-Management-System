//jshint esversion:6
//jshint esversion:8
import React from 'react';
import ReactDom from 'react-dom';
import logo from './trafficlight.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
class DebugAddPersonForm extends React.Component
{
    constructor(props)
    {
      super(props);
        this.state = {
          AadharNum:'',
          FirstName:'',
          LastName:'',
          dob:'',
          Email:'',
          pincode:'',
          LicenceID:'',
          MobileNo:'',
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
        if(this.state.AadharNum == ''||this.state.MobileNo == ''||this.state.FirstName == ''||this.state.LastName == ''||this.state.Email == ''||this.state.pincode == ''||this.state.LicenceID == '')
        {event.preventDefault();
          alert('Please fill all mandatory fields.');
          return;
        }
        // if(isNaN(parseInt(this.state.FineCharged)))
        // {
        //   alert("Fine charged must be a number.");
        // }
        else if(isNaN(parseInt(this.state.AadharNum)) || (this.state.AadharNum).length != 12)
        {event.preventDefault();
          alert("Aadhar ID invalid.");
          return;
        }
        else if(isNaN(parseInt(this.state.LicenceID)))
        {event.preventDefault();
          alert("Licence ID invalid.");
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
        });
        }
        // if(isNaN(parseInt(this.state.LicenseNum)))
        // {
        //   alert("License ID must be a number.");
        // }
        if(isNaN(parseInt(this.state.MobileNo)) || (this.state.MobileNo).length != 10)
        {
          event.preventDefault();
          alert("Mobile number is invalid.");
          return;
        }
    }


    handleChange(event) {
          if (event.target.name === "fname") {
            this.setState({ FirstName: event.target.value });
        }
        else if (event.target.name === "lname") {
            this.setState({ LastName: event.target.value });
        }
        else if (event.target.name === "mobileno") {
            this.setState({ MobileNo: event.target.value });
        }
        else if (event.target.name === "licenceid") {
            this.setState({ LicenceID: event.target.value });
        }
        else if (event.target.name === "aadhar") {
            this.setState({ AadharNum: event.target.value });
        }
        else if (event.target.name === "email") {
              this.setState({ Email: event.target.value });
             this.validateEmail(event.target.value);
        }
        else if (event.target.name === "pincode") {
            this.setState({ pincode: event.target.value });
        }
        else if (event.target.name === "dob") {
            this.setState({ dob: event.target.value });
        }
        // else if (event.target.name === "desc") {
        //     this.setState({ Description: event.target.value });
        // }
    }
    validateEmail(email){
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if(result===true){
          this.setState({
            emailError:false,
            email:email
          });
        } else{
          this.setState({
            emailError:true
          });
        }
      }


    render() {
        return(
          <div>
          <div class = "upperdivViolation upperdiv">
          <h1>Add User Into Database</h1>
          </div>
          <div class = "signal">
            <img src={logo} class = "signalpic" />
          </div>
          <div class = "formdiv">
            <form onSubmit= {this.handleSubmit} name='DebugAddPerson'>
             First Name
             <br/>
             <br/>
             <input
              class = "inputstyle"
              type='text'
              value={this.state.FirstName}
              name='fname'
              placeholder = "Enter FirstName"
              onChange={this.handleChange}
              />
              <br/><br/>
              Last Name
              <br/>
              <br/>
              <input
               class = "inputstyle"
               type='text'
               value={this.state.LastName}
               name='lname'
               placeholder = "Enter LastName"
               onChange={this.handleChange}
               />
               <br/><br/>
             Aadhar Number
             <br/>
             <br/>
             <input
              class = "inputstyle"
              type='text'
              value={this.state.AadharNum}
              name='aadhar'
              placeholder = "Enter Aadhar"
              onChange={this.handleChange}
              />
              <br/><br/>
              Date of Birth
              <br/>
              <br/>
              <input
               class = "inputstyle"
               type='Date'
               value={this.state.dob}
               name='dob'
               placeholder = "Enter Date Of Birth"
               onChange={this.handleChange}
               />
               <br/><br/>
               Pincode
               <br/>
               <br/>
               <input
                class = "inputstyle"
                type='number'
                value={this.state.pincode}
                name='pincode'
                placeholder = "Enter Pincode"
                onChange={this.handleChange}
                />
                <br/><br/>
                Mobile Number
                <br/>
                <br/>
                <input
                 class = "inputstyle"
                 type='text'

                 value={this.state.MobileNo}
                 name='mobileno'
                 placeholder = "Enter MobileNo"
                 onChange={this.handleChange}
                 />
                 <br/><br/>
                 Email
                 <br/>
                 <br/>
                 <input
                  class = "inputstyle"
                  type='Email'
                  value={this.state.Email}
                  name='email'
                  placeholder = "Enter Email ID"
                  onChange={this.handleChange}
                  />
                  {this.state.emailError ? <span style={{color: "red"}}>Please Enter valid email address</span> : ''}
                  <br/><br/>
                  Licence ID
                  <br/>
                  <br/>
                  <input
                   class = "inputstyle"
                   type='text'
                   value={this.state.LicenceID}
                   name='licenceid'
                   placeholder = "Enter Licence ID"
                   onChange={this.handleChange}
                   />
                   <br/><br/>


              <input class = "btn btn-primary" type="submit" value="Add Person "/>
             </form>


            </div>
            </div>
        )
    }
}
export default DebugAddPersonForm;
