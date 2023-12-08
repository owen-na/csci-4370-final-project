import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { Link, useParams} from "react-router-dom";

export default function User() {
    const { user_id } = useParams();
    const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);
  async function getProductList() {
    try {
      const res = await fetch("/products");
      setProducts(await res.json());
      console.log(user_id)
    } catch (err) {
      console.log(err);
    }
  }
    return (
        <div className="user-container">
          <header>
            <h1>Hello User</h1>
          </header>
            <div>
              <Link key={user_id} to={`/pages/Cart/${user_id}`}><button>View Your Cart</button></Link>
              <button>Add A Wishlist</button>
              <button>View your Wishlist</button>
              <button>View Purchase History</button>
            </div>
            <div className="product-holder">
        {products.map((product) => (
          <Link key={product.id} to={`/pages/product/${product.product_id}?user_id=${user_id}`}>
            <Product
              id={product.product_id}
              name={product.name}
              image={product.image}
              rating={product.rating}
              ratingcount={product.rating_count}
              price={product.price}
            />
          </Link>
        ))}
        <Link to="/pages/WishList">wishlist</Link>
      </div>
          
        </div>
      );
}
