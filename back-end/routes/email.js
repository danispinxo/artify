const router = require("express").Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.TWILIO_SEC);

router.post("/", (req, res) => {
  
  const msg = {
    to: "tonyjortons@gmail.com",
    from: "noreplyartify@gmail.com",
    subject: "Art Commission",
    text: `Hello, my name is ${req.body.name}. ${req.body.message}. You can contact me at ${req.body.email}. Thank you!`,
    html: `<strong>Hello, my name is ${req.body.name}. <br></br>${req.body.message}. <br></br> You can contact me at ${req.body.email}. Thank you!</strong>`,
  };

  sgMail
    .send(msg)
    .then((response) => {return res.json('Successfully sent email')})
    .catch((error) => console.error(error.message));
});

module.exports = router;
