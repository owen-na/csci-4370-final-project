import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header.jsx";
import Product from "./pages/Product";
import Main from "./pages/Main.jsx";
import Wishlist from "./pages/WishList.jsx";
import Cart from "./pages/Cart.jsx";
import Shipping from "./pages/Shipping.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="pages/WishList" element={<Wishlist />} />
        <Route path="/" element={<Main />} />
        <Route path="pages/Cart" element={<Cart />} />
        <Route path="pages/Shipping" element={<Shipping />} />
        <Route path="pages/Product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
