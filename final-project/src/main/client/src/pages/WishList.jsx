import WishListItem from "../components/WishListItem";
import "../styling/WishList.css";
import { useState, useEffect } from "react";
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
  }
  async function deleteItem(userID, productID) {
    const response = await fetch(`/wishlist/${wishlist_id}/${productID}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getProductList();
    } else {
      console.error("Error while sending POST request");
    }
  }
  return (
    <div className="main-page">
      <div className="header">
        <h1>{products.name}'s Wish List</h1>
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
          onDelete={() => deleteItem(wishlist_id, product.id)}
        />
      ))}
    </div>
  );
}
