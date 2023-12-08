import "../styling/Shipping.css";
import {useState} from "react";

export default function Shipping() {
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  const [cardName, setCardName] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [cardNumber, setCardNumber] = useState("")



  async function handleSubmit(event) {
    event.preventDefault(); // prevent default page refreshing
    /*
    * Sending a post request to the server to with the username and password
    */
    const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "address" : address , "country" : country, "name_on_card" : cardName , "zipcode" : zipcode, "card_number" :cardNumber}),
    });
  }
  return (
    <div className="shipping-container">
      <div className>
        <h1>Shipping Information</h1>
      </div>
      <form action="/shipping" method="POST" onSubmit={handleSubmit}>
        <label for="address">Street Address</label>
        <input type="text" input={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"></input>
        <label for="country">Country</label>
        <input type="text" input={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country"></input>

        <h1> Payment Information</h1>
        <label for="name_on_card">Name</label>
        <input type="text" input={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name On Card"></input>
        <label for="zipcode">Zipcode</label>
        <input type="text" input={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="Zipcode"></input>
        <label for="card_number">Card Number</label>
        <input type="text" input={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
