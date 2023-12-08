import "../styling/CartItem.css";

function OrderItem(props) {
  return (
    <div className="card">
      <img className="product-image" src={props.image} alt="product"></img>
      <div className="middle-section">
        <p>{props.name}</p>
        <p className="price">{props.price}</p>
      </div>
    </div>
  );
}

export default OrderItem;
