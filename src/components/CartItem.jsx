import "../styling/CartItem.css";

function CartItem() {
  return (
    <div className="card">
      <img alt="product-image"></img>
      <div className="middle-section">
        <p>product name</p>
        <p className="price">$price</p>
      </div>
      <button>🗑️ Remove</button>
    </div>
  );
}

export default CartItem;
