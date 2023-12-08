function Product(props) {
  return (
    <div className="product-container">
      <div className="image-container">
        <img src={props.image}/>
      </div>
      <div className="name-container">
        <p className="name-text">{props.name}</p>
      </div>
      <div className="rating-container">
        <p>⭐⭐⭐⭐⭐ {props.rating_count}</p>
      </div>
      <div className="price-container">
        <p className="price-text">{props.price}</p>
      </div>
    </div>
  );
}
export default Product;
