import CartItem from "../components/CartItem";
import "../styling/Cart.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { cart_id } = useParams();
  async function getCartItems() {
    try {
      const res = await fetch(`/cart/${cart_id}`);
      setCartProducts(await res.json());
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteItem(cart_id, product_id) {
    const response = await fetch(`/wishlist/${cart_id}/${product_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getCartItems();
    } else {
      console.error("Error while sending POST request");
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
            cart_id={cart_id}
            product_id={product.id}
            onDelete={() => deleteItem(cart_id, product.id)}
          />;
        })}
        {/* some sort of function to load these as intended instead of statically */}
        <button className="checkout-button">PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
}
