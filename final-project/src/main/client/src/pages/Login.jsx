import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styling/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  async function handleSubmit(event) {
    event.preventDefault(); // prevent default page refreshing
    /*
    * Sending a post request to the server to with the username and password
    */
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username" : username , "password" : password}),
    });

    if (response.ok) {
      console.log("Success")
      const { user_id } = await response.json();
      navigate(`/pages/user/${user_id}`)
    } else {
        console.error("Error while sending POST request");
    }
}
  
  return (
    <div className="sign-in-container" >
      <form onSubmit={handleSubmit}>
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
