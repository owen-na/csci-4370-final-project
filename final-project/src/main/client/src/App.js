import "./App.css";
import Header from "./components/Header.jsx";
import Main from "./pages/Main.jsx";
import Wishlist from "./pages/WishList.jsx";
import Cart from "./pages/Cart.jsx";
import Shipping from "./pages/Shipping.jsx";
import SignUp from "./pages/SignUp.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/Login.jsx";
import User from "./pages/User.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="pages/WishList/:wishlist_id" element={<Wishlist />} />
        <Route path="/" element={<Main />} />
        <Route path="pages/product/:productID" element={<Product />} />
        <Route path="pages/SignUp" element={<SignUp />} />
        <Route path="pages/Login" element={<Login />} />
        <Route path="pages/Cart/:user_id" element={<Cart />} />
        <Route path="pages/user/:user_id" element={<User />} />
        <Route path="pages/shipping/:user_id" element={<Shipping />} />
      </Routes>
    </>
  );
}

export default App;
