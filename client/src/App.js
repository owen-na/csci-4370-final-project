import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header.jsx";
import Main from "./pages/Main.jsx";
import Wishlist from "./pages/WishList.jsx";
import Cart from "./pages/Cart.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="pages/WishList" element={<Wishlist />} />
        <Route path="/" element={<Main />} />
        <Route path="pages/Cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
