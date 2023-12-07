import logo from "../assets/logo.svg";
import "../styling/Header.css";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="logo-wrapper">
          <button className="logo-button">
            <img src={logo} alt="temo logo"></img>
          </button>
        </div>
        <div>
          <button>Login</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
