import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import '../styles/paymentForm.scss'
import { useNavigate } from "react-router";
import { DataContext } from "../context/dataContext";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#87bbfd",
			color: "#87bbfd"
		}
	}
}

export default function PaymentForm({cart, setCart}) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dataState = useContext(DataContext);
  const user = dataState.user; // context for current user

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    setIsLoading(true);

      if(!error) {
        try {
          const {id} = paymentMethod
          const response = await axios.post('/payment', {
            amount: 1000,
            id: id
          })
          if (response.data.success) {
            console.log('Successful payment')
            setSuccess(true)
            setIsLoading(false)
            navigate('/confirmation', {cart: cart})
          }
        } catch(error){
          console.log('Error', error)
        }
      } else {
        console.log(error.message)
      }

      const orderId = cart[0].order_id
        
        Promise.all([
          axios.put('/emptycart', {orderId}),
          axios.put('/sold', {orderId})
        ])
        .then((res) => {
            const orderInfo = {};
            orderInfo.userID = user.id;
           
              axios.post(`order/api/cart`, orderInfo)
                .then((res) => {
                  setCart(res.data);
                })
        })
      

  }

  
  return ( 
  <>
   {!success ?
   <form className="payment-form" onSubmit={handleSubmit}>
    <fieldset className='FormGroup'>
      <div className='FormRow'>
        <CardElement options={CARD_OPTIONS} />
      </div>
    </fieldset>
    {!isLoading && <button >Pay</button>}
    {isLoading && <button disabled>
      <i className="fas fa-spinner fa-spin"></i>
      PAYING</button>}
   </form>
    :
    <div>
      <h2>
        You just bought a sweet piece of artwork! Congrats!
      </h2>
    </div>
   } 
  </>
  );
}
