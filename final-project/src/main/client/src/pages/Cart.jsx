import CartItem from "../components/CartItem";
import "../styling/Cart.css";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { user_id } = useParams();
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/pages/shipping/${user_id}`)
  }
  async function getCartItems() {
    try {
      const res = await fetch(`/cart/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCartProducts(await res.json());
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteItem(product_id, user_id) {
    const response = await fetch(`/cart/${product_id}?user_id=${user_id}`, {
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
        {cartProducts.map((product) => (
          <CartItem
            name={product.name}
            image={product.image}
            price={product.price}
            user_id={user_id}
            product_id={product.product_id}
            delete={true}
            onDelete={() => deleteItem(product.product_id, user_id)}
          />
        ))}
        {/* some sort of function to load these as intended instead of statically */}
        <button className="checkout-button" onClick={handleClick}>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
}
