import "../styling/Product.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Product() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const res = await fetch(`/product/${productID}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchProductDetails();
  }, [productID]);

  return (
    <div className="page">
      <div className="product-name">
        <p>⭐⭐⭐⭐⭐ {product.rating_count}</p>
      </div>
      <div className="middle-section">
        <img src={product.image} alt={product.name}></img>
        <div className="info">
          <text>{product.name}</text>
          <div className="actions">
            <p>{product.price}</p>
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
