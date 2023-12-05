import "../styling/WishListItem.css";

function WishListItem() {
  return (
    <div className="main">
      <img className="product-image" alt="item-image"></img>
      <div className="middle-section">
        <p>Product Name</p>
        <p>⭐⭐⭐⭐⭐ (number_ratings)</p>
      </div>
      <div className="actions">
        <p className="price-text">$price</p>
        <button className="add-to-cart">Add to Cart</button>
        <button className="remove-from-wishlist">remove from wishlist</button>
      </div>
    </div>
  );
}

export default WishListItem;
