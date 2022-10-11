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
  
  const receiptMessage = (cart, fullName ) => {
    
    let message = `Thank you ${fullName}!\nYou ordered `
    for (const item of cart) {
      message+= `| Item: ${item.name} Price: $${item.price_cents/100} Full Quality Artwork Link: ${item.public_image} | `
    }
    message+= `\nDate: ${cart[0].order_date} | \nYour newly purchased artwork is now available in your purchased artworks tab. \nThank you for using Artify!`
    return message;
  }


  const msg = {
    to: "tonyjortons@gmail.com",
    from: "noreplyartify@gmail.com",
    subject: "Artify Purchase Receipt",
    text: `${receiptMessage(cart, fullName)}`,
    html: `<strong>${receiptMessage(cart, fullName)}</strong>`,
  };

  sgMail
    .send(msg)
    .then((response) => {return res.json('Successfully sent email')})
    .catch((error) => console.error(error.message));
});

module.exports = router;