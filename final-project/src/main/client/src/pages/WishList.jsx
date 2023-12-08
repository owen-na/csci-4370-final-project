import WishListItem from "../components/WishListItem";
import "../styling/WishList.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function WishList() {
  const { wishlist_id } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);
  async function getProductList() {
    try {
      const res = await fetch("/wishlist");
      setProducts(await res.json());
    } catch (err) {
      console.log(err);
    }

    return (
      <div className="main-page">
        <div className="header">
          <h1> Wish List</h1>
        </div>
        {products.map((product) => (
          <WishListItem
            wishlistid={wishlist_id}
            product_id={product.id}
            name={product.name}
            image={product.image}
            rating={product.rating}
            amountOfRatings={product.rating_count}
            price={product.price}
          />
        ))}
      </div>
    );
  }
}
