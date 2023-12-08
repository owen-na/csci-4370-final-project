import "../styling/CartItem.css";

function CartItem(props) {
  return (
    <div className="card">
      <img className="product-image" src={props.image} alt="product"></img>
      <div className="middle-section">
        <p>{props.name}</p>
        <p className="price">{props.price}</p>
      </div>
      <button className="remove">🗑️ Remove</button>
    </div>
  );
}

export default CartItem;
