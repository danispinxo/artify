const router = require('express').Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.TWILIO_SEC);

router.post("/", (req, res) => {

  const user = req.body.currentUser
  const firstName = user.first_name
  const lastName = user.last_name
  const fullName = `${firstName} ${lastName}`
  const cart = req.body.cart
  
  console.log(cart)
  const receiptMessage = (cart ) => {
    
    let message = ``
    for (const item of cart) {
      message+= `<p> <strong>${item.name}</strong> Price: $${item.price_cents/100} Full Quality Artwork Link: ${item.public_image} | </p>`
    }
   
    return message;
  } 

  const msg = {
    to: "tonyjortons@gmail.com",
    from: "noreplyartify@gmail.com",
    subject: "Artify Purchase Receipt",
    text: `${receiptMessage(cart, fullName)}`,
    html: `
    
    <img class="max-width" border="0" style="display:flex; text-align: center; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="800" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/4ad091f2-00dc-4c89-9ad8-1d7aeaf169c2/600x189.png" height="189">
    <h1 >Order Summary</h1>
    <h2 >Thank you ${fullName} for shopping with us today!</h2>
    <p>${new Date().toISOString().slice(0, 19).replace('T', ' ')} </p>
    <h3>Your ordered items: </h3>
    ${receiptMessage(cart)}
    <h3 >Your newly purchased artwork is now available in your purchased artworks tab. Thank you for using Artify! </h3>
    `,
  };

  sgMail
    .send(msg)
    .then((response) => {return res.json('Successfully sent email')})
    .catch((error) => console.error(error.message));
});

module.exports = router;