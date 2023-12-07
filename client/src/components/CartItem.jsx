import "../styling/CartItem.css";

function CartItem(props) {
  return (
    <div className="card">
      <img src={props.image} alt="product-image"></img>
      <div className="middle-section">
        <p>{props.name}</p>
        <p className="price">{props.price}</p>
      </div>
      <button>🗑️ Remove</button>
    </div>
  );
}

export default CartItem;
