export default function Product() {
  return (
    <div className="page">
      <div className="product-name">
        <p>product name</p>
        <p>⭐⭐⭐⭐⭐ (number_ratings)</p>
      </div>
      <div className="middle-section">
        <img alt="product-image"></img>
        <div className="info">
          <text>description placeholder</text>
          <div className="actions">
            <p>$price</p>
            <button>add to cart</button>
            <button>add to wishlist</button>
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
