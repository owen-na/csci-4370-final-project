import "../styling/WishListItem.css";

function WishListItem(props) {
  return (
    <div className="main">
      <img className="product-image" src={props.image} alt="item-image"></img>
      <div className="middle-section">
        <p>{props.name}</p>
        <p>⭐⭐⭐⭐⭐ {props.amountOfRatings}</p>
      </div>
      <div className="actions">
        <p className="price-text">{props.price}</p>
        <button className="add-to-cart">Add to Cart</button>
        <button className="remove-from-wishlist">remove from wishlist</button>
      </div>
    </div>
  );
}

export default WishListItem;
