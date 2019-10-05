//jshint esversion:6
//jshint esversion:8
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function HomePage(props)
{

    const initialState = {uname : "Coimbatore Traffic Department", password : "what"};

    const [user, setUser] = useState(initialState);

    async function getData()
    {
        // setUser({...user, uname: "no"});
        await axios.get("http://localhost:8081/").then(response => {
            console.log("invoke max");
            setUser(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    
    return(
        <div>
            <h1> {user.uname} </h1>
            <button onClick = {getData}>Open Traffic Management System</button>
        </div>
    )
}
