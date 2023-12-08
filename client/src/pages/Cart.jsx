import CartItem from "../components/CartItem";
import "../styling/Cart.css";
import { useState, useEffect } from "react";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  async function getCartItems() {
    try {
      const res = await fetch("/cart");
      setCartProducts(await res.json());
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <div className="mainpage">
      <div className="cart-text">
        <h1>Cart</h1>
      </div>
      <div className="item-list">
      {cartProducts.map((product) => {
        <CartItem
          name={product.name}
          image={product.image}
          price={product.price}
        />;
      })}
      {/* some sort of function to load these as intended instead of statically */}
      <button className="checkout-button">PROCEED TO CHECKOUT</button>
    </div>
  );
}
