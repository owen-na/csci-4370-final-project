import "../styling/Shipping.css";
export default function Shipping() {
  return (
    <div className="shipping-container">
      <div className>
        <h1>Shipping Information</h1>
      </div>
      <form action="/shipping">
        <label for="address">Street Address</label>
        <input type="text" id="street-address"></input>

        <label for="town-city">Town/City</label>
        <input type="text" id="town-city"></input>
        <label for="state">State</label>
        <input type="text" id="state"></input>

        <label for="zipcode">Zipcode</label>
        <input type="text" id="zipcode"></input>
        <label for="country">Country</label>
        <input type="text" id="country"></input>
        <h1> Payment Information</h1>
        <label for="name">Name</label>
        <input type="text" id="name"></input>
        <label for="pzipcode">Zipcode</label>
        <input type="text" id="pzipcode"></input>

        <label for="cardnumber">Card Number</label>
        <input type="text" id="cardnumber"></input>

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
