import Product from "../components/Product";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Main = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);
  async function getProductList() {
    try {
      const res = await fetch("/products");
      setProducts(await res.json());
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <main>
      <div className="product-holder">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.product_id}`}>
            <Product />
          </Link>
        ))}
        <Link to="/pages/WishList">wishlist</Link>
      </div>
    </main>
  );
};
export default Main;
