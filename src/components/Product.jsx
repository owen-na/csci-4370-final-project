function Product() {
  return (
    <div className="product-container">
      <div className="image-container">
        <img />
      </div>
      <div className="name-container">
        <p className="name-text">product name</p>
      </div>
      <div className="rating-container">
        <p>⭐⭐⭐⭐⭐ (number_ratings)</p>
      </div>
      <div className="price-container">
        <p className="price-text">$price</p>
      </div>
    </div>
  );
}
export default Product;
