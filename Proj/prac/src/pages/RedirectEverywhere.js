import React from 'react';

import logo from './trafficlight.png';
import './index.css';
import { Redirect } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AccidentReport extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            ViolationEntry: false,
            AccidentEntry: false,
            AA:false,
            APA:false,
            VR:false,
            CWW:false
        };
    }
    setViolation = () => {
        this.setState({
            ViolationEntry: true
        })
    }
    setAccident = () => {
        this.setState({
            AccidentEntry: true
        })
    }
    setAA = () => {
        this.setState({
            AA: true
        })
    }
    setAPA = () => {
        this.setState({
            APA: true
        })
    }
    setVR = () => {
        this.setState({
            VR: true
        })
    }
    setCWW = () => {
        this.setState({
            CWW: true
        })
    }
    renderRedirect = () => {
        if (this.state.ViolationEntry) {
            return <Redirect to='/DebugAddViolation' />
        }
        else if(this.state.AccidentEntry)
        {
            return <Redirect to='/AddAccident' />
        }
        else if (this.state.AA) {
            return <Redirect to='/AccidentReport' />
        }
        else if (this.state.APA) {
            return <Redirect to='/ProneZone' />
        }
        else if (this.state.VR) {
            return <Redirect to='/ViolationReport' />
        }
        else if (this.state.CWW) {
            return <Redirect to='/MostWanted' />
        }

    }
    render() {
        return (
            <div>
                <div align="center">
                    {this.renderRedirect()}
                    <img src={logo} class="signalpic" />
                    <br />
                    
                    <button onClick={this.setViolation} class="Button">Add Violation</button>
                    <br />
                    <br />
                    <button onClick={this.setAccident} class="Button">Add Accident</button>
                    <br />
                    <br />
                    <button onClick={this.setAA} class="Button">Generate Accident Report</button>
                    <br />
                    <br />
                    <button onClick={this.setAPA} class="Button">Accident Prone Location</button>
                    <br />
                    <br />
                    <button onClick={this.setVR} class="Button">Violation Report</button>
                    <br />
                    <br />
                    <button onClick={this.setCWW} class="Button">Citizens With Warning</button>
                </div>
            </div>
        )
    }
}
export default AccidentReport;