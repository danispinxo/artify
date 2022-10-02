import React, { useState } from "react";
import "../styles/button.scss";
import Button from "./Button";
import Sold from "./Sold";
import Purchases from "./Purchases";

export default function OrderHistory() {
  const SOLD = 'SOLD';
  const PURCHASES = 'PURCHASES';

  const [orderType, setOrderType] = useState(SOLD);

  return (
    <div className="order-history">
      <h1>Your Order History</h1>
      <Button message={"Sold Artworks"} onClick={() => setOrderType(SOLD)}/>
      <Button message={"Purchased Artworks"} onClick={() => setOrderType(PURCHASES)}/> 

      {orderType === SOLD && <Sold />}
      {orderType === PURCHASES && <Purchases />}
    </div>
  )
}