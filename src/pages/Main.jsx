import Product from "../components/Product";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main>
      <div className="product-holder">
        <Product></Product>
        <Link to="/pages/WishList">wishlist</Link>
      </div>
    </main>
  );
};
export default Main;
