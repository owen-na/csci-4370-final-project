import "../styling/Product.css";
export default function Product(props) {
  return (
    <div className="page">
      <div className="product-name">
        <p>⭐⭐⭐⭐⭐ (number_ratings)</p>
      </div>
      <div className="middle-section">
        <img src={props.image} alt={props.name}></img>
        <div className="info">
          <text>{props.name}</text>
          <div className="actions">
            <p>{props.price}</p>
            <button>ADD TO CART</button>
            <button>ADD TO WISHLIST</button>
          </div>
        </div>
      </div>
      <div className="reviews">
        <p>Reviews</p>
        <button>Add Review</button>
        {/* need review component here, need some planning-ish */}
      </div>
    </div>
  );
}
