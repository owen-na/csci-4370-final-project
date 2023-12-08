import "../styling/Order.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderItem } from "../components/OrderItem.jsx";
export default function Order(props) {
  const [orderInformation, setOrderInformation] = useState([]);
  const [discountInformation, setDiscountInformation] = useState(null);
  const [paymentInformation, setPaymentInformation] = useState(null);
  const [shippingInformation, setShippingInformation] = useState(null);
  const [productList, setProductList] = useState([]);
  async function getOrderInformation() {
    try {
      const res = await fetch(`/order/${props.order_id}`);
      setOrderInformation(await res.json());
    } catch (err) {
      console.log(err);
    }
  }
  async function getInformation() {
    try {
      const discountRes = await fetch(
        `/discount/${orderInformation.discount_id}`
      );
      setDiscountInformation(await discountRes.json());

      const paymentRes = await fetch(`/payment/${orderInformation.payment_id}`);
      setPaymentInformation(await paymentRes.json());

      const shippingRes = await fetch(
        `/shipping/${orderInformation.shipping_id}`
      );
      setShippingInformation(await shippingRes.json());

      const productRes = await fetch(
        `/products/${orderInformation.product_id}`
      );
      setProductList(await productRes.json());
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getOrderInformation();
  }, []);
  useEffect(() => {
    getInformation();
  }, [orderInformation]);
  return (
    <>
      <div>
        <div className="h1-container">
          <h1>
            Order {props.order_id} {orderInformation.date}
          </h1>
        </div>
        <div>
          <h2> Discount</h2>{" "}
          <p>
            {discountInformation.discount_name} :{" "}
            {discountInformation.percentage}%
          </p>
        </div>
        <div>
          <h2> Payment</h2>{" "}
          <p>
            {paymentInformation.payment_name}, {paymentInformation.card_number},{" "}
            {paymentInformation.zipcode}
          </p>
        </div>
        <div>
          <h2> Shipping</h2>{" "}
          <p>
            {shippingInformation.address} {shippingInformation.city},{" "}
            {shippingInformation.state} {shippingInformation.zipcode},
            {shippingInformation.country}
          </p>
        </div>
        <div className="item-list">
          {productList.map((product) => (
            <OrderItem
              name={product.name}
              image={product.image}
              price={product.price}
              product_id={product.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
