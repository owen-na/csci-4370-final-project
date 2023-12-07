import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header.jsx";
import Main from "./pages/Main.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
