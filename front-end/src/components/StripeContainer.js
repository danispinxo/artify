import React, { useState} from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'




export default function StripeContainer() {
  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUB
  const [stripePromise, setStripePromise] = useState(() => loadStripe(PUBLIC_KEY))

  return (
    <Elements stripe={stripePromise} setStripePromise={setStripePromise}>
      <PaymentForm />
    </Elements>
  )
}
