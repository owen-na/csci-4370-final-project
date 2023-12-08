import "../styling/Shipping.css";
export default function Shipping() {
  return (
    <div className="shipping-container">
      <h1>Shipping Information</h1>
      <form action="/shipping">
        <label for="address">Street Address</label>
        <input type="text" id="street-address"></input>

        <label for="town-city">Town/City</label>
        <input type="text" id="town-city"></input>

        <label for="country">Country</label>
        <input type="text" id="country"></input>

        <label for="state">State</label>
        <input type="text" id="state"></input>

        <label for="zipcode">Zipcode</label>
        <input type="text" id="zipcode"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
