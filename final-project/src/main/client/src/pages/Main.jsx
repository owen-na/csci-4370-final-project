import Product from "../components/Product";
import { Link } from "react-router-dom";
import "../styling/Main.css";
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
  function productLoop() {
    const rows = [];

    for (let i = 0; i < 100; i += 20) {
      const row = products
        .slice(i, i + 20)
        .map((product) => (
          <Product
            key={product.id}
            name={product.name}
            image={product.image}
            rating={product.rating}
            amountOfRatings={product.rating_count}
            price={product.price}
          />
        ));

      rows.push(
        <div className="product-row" key={i / 20}>
          {row}
        </div>
      );
    }

    return rows;
  }
  return (
    <main>
      <div className="product-holder">{productLoop()}</div>
    </main>
  );
};
export default Main;
