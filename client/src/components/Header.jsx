import logo from "../assets/logo.svg";
const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="temo logo"></img>
        </div>
        <div>
          <button>Login</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
