import "../styling/Shipping.css";
export default function Shipping() {
  return (
    <div className="shipping-container">
      <div className>
        <h1>Shipping Information</h1>
      </div>
      <form action="/shipping" method="post">
        <label for="address">Street Address</label>
        <input type="text" id="address"></input>
        <label for="country">Country</label>
        <input type="text" id="country"></input>
        <input type="submit" value="Submit"></input>
      </form>
      <form action="/payment" method="post">
        <h1> Payment Information</h1>
        <label for="name_on_card">Name</label>
        <input type="text" id="name_on_card"></input>
        <label for="zipcode">Zipcode</label>
        <input type="text" id="zipcode"></input>

        <label for="card_number">Card Number</label>
        <input type="text" id="card_number"></input>

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
