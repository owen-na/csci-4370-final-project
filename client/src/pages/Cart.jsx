import CartItem from "../components/CartItem";
import "../styling/Cart.css";

export default function Cart() {
  return (
    <div className="mainpage">
      <div className="cart-text">
        <p>Cart</p>
      </div>
      <CartItem></CartItem>
      {/* some sort of function to load these as intended instead of statically */}
      <button>proceed to checkout</button>
    </div>
  );
}
