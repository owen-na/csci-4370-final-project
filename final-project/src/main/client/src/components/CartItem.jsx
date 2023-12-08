import "../styling/CartItem.css";

function CartItem(props) {
  function deleteButton() {
    if (props.delete === true) {
      return () => props.onDelete(props.cart_id, props.product_id);
    }
  }
  return (
    <div className="card">
      <img className="product-image" src={props.image} alt="product"></img>
      <div className="middle-section">
        <p>{props.name}</p>
        <p className="price">{props.price}</p>
      </div>
      <button onClick={deleteButton} className="remove">
        🗑️ Remove
      </button>
    </div>
  );
}

export default CartItem;
