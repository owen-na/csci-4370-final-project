import React, { useState } from "react";
import {Redirect} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styling/SignUp.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const navigate = useNavigate(); 

  async function handleSubmit(event) {
    event.preventDefault(); // prevent default page refreshing
    /*
    * Sending a post request to the server to with the username and password
    */
    const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username" : username , "password" : password, "name" : fname}),
    });

    if (response.ok) {
      console.log("Success")
      navigate("/")
    } else {
        console.error("Error while sending POST request");
    }
}

  return (
   
    <div className="sign-in-container" >
      <form onSubmit={handleSubmit}>
            <div>
            <input type="text"
                value={fname} 
                onChange={(e) => setFname(e.target.value)}
                placeholder="Name"></input>
            </div>
            <div>
            <input type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"></input>
            </div>
            <div>
            <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"></input>
            </div>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  );
}
