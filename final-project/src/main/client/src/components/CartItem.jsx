import "../styling/CartItem.css";

function CartItem(props) {
  const deleteButton = () => {
    if (props.delete) {
      props.onDelete(props.product_id, props.user_id);
    }
  };
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
