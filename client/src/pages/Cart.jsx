import CartItem from "../components/CartItem";
import "../styling/Cart.css";

export default function Cart() {
  return (
    <div className="mainpage">
      <div className="cart-text">
        <p>Cart</p>
      </div>
      <div className="item-list">
        <CartItem></CartItem>
        {/* some sort of function to load these as intended instead of statically */}
      </div>
      <button>proceed to checkout</button>
    </div>
  );
}
