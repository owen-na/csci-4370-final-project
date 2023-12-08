import "../styling/PaymentHistory.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../components/Order.jsx";
export default function PaymentHistory() {
  const [payProducts, setPayProducts] = useState([]);
  const { payment_history_id } = useParams();
  async function getPayItems() {
    try {
      const res = await fetch(`/paymenthistory/${payment_history_id}`);
      setPayProducts(await res.json());
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getPayItems();
  }, []);
  return (
    <>
      <div>
        <h1>Payment History</h1>
      </div>
      {payProducts.map((product) => (
        <Order order_id={product.order_id} />
      ))}
    </>
  );
}
