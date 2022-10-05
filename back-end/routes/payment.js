const router = require('express').Router();
const stripe = require("stripe")(process.env.STRIPE_SEC)
require('dotenv').config()

router.post("/", async (req, res) => {
  let {amount, id} = req.body
  try{
    const payment = await stripe.paymentIntents.create( {
      amount,
      currency: 'CAD',
      description: 'Artify',
      payment_method: id,
      confirm:true
    })
    console.log("Payment", payment)
    res.json({
      message:"Payment Successful",
      success: true
    })
  }
  catch(error){
    console.log('Error', error)
    res.json( {
      message: 'Payment failed',
      success: false
    })
  }
  
});

module.exports = router;