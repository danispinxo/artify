import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/button.scss";
import Button from "./Button";
import Sold from "./OrderHistory/Sold";
import Purchases from "./OrderHistory/Purchases";

export default function OrderHistory() {
  const SOLD = 'SOLD';
  const PURCHASES = 'PURCHASES';

  const { id } = useParams();
  const [orderType, setOrderType] = useState(SOLD);
  const [soldArtworks, setSoldArtworks] = useState([]);
  const [purchasedArtworks, setPurchasedArtworks] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/order/api/sold", { params: { id: id } }),
      axios.get("/order/api/purchased",  { params: { id: id } })
    ]).then((all) => {
      setSoldArtworks(all[0].data);
      setPurchasedArtworks(all[1].data)
    })
  },[id])

  return (
    <div className="order-history">
      <Button message={"Sold Artworks"} onClick={() => setOrderType(SOLD)}/>
      <Button message={"Purchased Artworks"} onClick={() => setOrderType(PURCHASES)}/> 

      {orderType === SOLD && <Sold orders={soldArtworks}/>}
      {orderType === PURCHASES && <Purchases orders={purchasedArtworks}/>}
    </div>
  )
}