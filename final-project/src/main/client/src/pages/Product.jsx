import "../styling/Product.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Product() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Fetching product details for ID:", productID);

    async function fetchProductDetails() {
      try {
        const res = await fetch(`/products/${productID}`);
        const data = await res.json();
        console.log("Fetched Product Data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchProductDetails();
  }, [productID]);

  async function handleCartSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });

    if (response.ok) {
      console.log("Received response from server");
    } else {
      console.error("Error while sending POST request");
    }
  }
  async function handleWishlistSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });

    if (response.ok) {
      console.log("Received response from server");
    } else {
      console.error("Error while sending POST request");
    }
  }

  // if there is not product return loading text
  if (!product) {
    console.error("Product data is null");
    return <div>Loading...</div>;
  }
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
            <button onclick={handleCartSubmit()}>ADD TO CART</button>
            <button onclick={handleWishlistSubmit()}>ADD TO WISHLIST</button>
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
