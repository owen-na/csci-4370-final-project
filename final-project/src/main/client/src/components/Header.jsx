import logo from "../assets/logo.svg";
import "../styling/Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      body: JSON.stringify({ username: username, password: password }),
    });

    if (response.ok) {
      console.log("Received response from server");
    } else {
      console.error("Error while sending POST request");
    }
  }

  return (
    <header>
      <div className="wrapper">
        <Link to="/">
          <div className="logo-wrapper">
            <button className="logo-button">
              <img src={logo} alt="temo logo"></img>
            </button>
          </div>
        </Link>
        <Link to="pages/SignUp">
          <button>Login/Register</button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
