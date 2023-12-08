import "../styling/CartItem.css";

function CartItem() {
  return (
    <div className="card">
      <img className="product-image" alt="product"></img>
      <div className="middle-section">
        <p>product name</p>
        <p className="price">$price</p>
      </div>
      <button className="remove">🗑️ Remove</button>
    </div>
  );
}

export default CartItem;
