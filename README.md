# Artify

Welcome to Artify! Artify is an e-commerce application tailored for artists to display their work to others online in their portfolio. Users are free to browse a variety of art types depending on their preference. Users are also able to bid on specific artwork that they are interested in and as well contact the artist for specific commissions. 

Artify connects artists who want to share their portfolios to make their work available for purchase with clients who can commission other artwork. These clients would include designers of all kinds (graphic/web, book, clothing, printers/printmakers, marketing teams, and so on). 

Team members: Mohammed Abbas, Jeffrey Ho, and Dani Spinosa. Current update and deployment by Dani. 

## Screenshots

![Homepage](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Homepage.png "Artify Homepage")
![Edit Profile](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Edit.png "Artify Edit Profile Page")
![Search Results](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Search.png "Artify Search Results for Term 'Try'")
![Cart](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Cart.png "Artify Cart Page")
![Confirmation](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Confirmation.png "Artify Confirmation Page After Successful Checkout")
![Gallery Page](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Gallery.png "Artify Artist Gallery")
![Artists Page](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Artists.png "Artify Artists Directory")
![Category Page](https://github.com/ynot9042/Finals/blob/master/front-end/public/images/screenshots/Categories.png "Artify Category Directory")


## Dependencies

### Front-End
- React && React Router
- Bootstrap
- Material UI
- SASS
- Swiper
- FontAwesome
- Axios
- Stripe
- EmailJS

### Back-End
- Node.js
- Node Fetch
- PostgreSQL (pg)
- bcrypt
- Body Parser
- Cookie Session
- Cloudinary
- Express
- Multer
- Stripe

### Dev Dependencies
- Jest
- Morgan
- Nodemon
- Cypress

## Getting Started
1. Ensure you have the proper .env credentials && npm i both folders to install all dependencies
2. Start the back end => npm run dev from back-end
3. Start the front end => npm start from front-end

## Features

### Dynamic Homepage

Artify's homepage dynamically renders a Swiper carousel of currently-available art. The selection changes after each render for an exciting UI. The homepage also features a selection of Top-Rated users based on client ratings after artwork purchases. And, on the homepage you'll find a quick directory of all the available art categories. Artify also features a handy dyanmic and responsive navbar with links to the category and artist directories, the user's profile and cart, and a search bar for finding just the right artwork! 

### Browse By Category and Artist

Browse the Artify collection by category--Photography, Painting, Illustration, and more--or by artist. The artist directory contains each artist's current average rating and a link to the artist's beautifully-designed gallery.

### Artist Gallery & Mailer

On the artist gallery page, you can browse all of the artist's current portfolio, a beautiful aritst-chosen cover image, their name/bio and avatar, and click on the mailer button which opens a modal that sends an email right to your favourite artist. You can use this to commission unique art or just ask the artist about their process. 

### Edit Your Artist Profile

All users--but especially artists--can fully customize their profiles and portfolios. Artify offers editing capabilities for avatar and cover photo, user information (name, email, password, and bio), and complete customization of the portfolio including ability to add and delete portfolio items, and edit their identifying content (name, description, price). These seem like fairly standard features, but they took a very long time to implement! WOW GOOD JOB TEAM! 

### Cart, Checkout, Receipts, and Ratings

All users--but especially clients--can shop the artworks! Add art to your cart from the gallery page or from each artwork's individual product description page. Once art is in a client's cart, it shows as "in cart" on all other clients' browsers to prevent two clients from purchasing the rights to the same piece of art. Sold art is also not available to add to cart. In the cart, users can remove any item they've changed their mind about. Checkout via Stripe is available on the cart page and upon successful checkout, users receive a detailed itemized receipt mailed to the address associated with the account and are navigated to a page to rate each individual purchase. 

### Watermarked Images for Artist Protection

Images are internally watermarked for artist protection. Upon successful checkout, the user is sent an email with a high resolution attachment. The ensures the user's work is properly protected before purchase. 

### Encrypted Password Storage

All user information is stored in our PostgreSQL database. User passwords are stored usign bcrypt authentication (hash and salt) and are not included where other user data is stored (cookies or context). Again, this seems pretty standard, but took a long time to implement. 

### Search By Art Title, Description, Category, and Artist Name

Artify lets you search its art database! In the navbar, type in a search query and be redirected to a page of search results containing all art that has your term in the title or description, the category, or the artist's name! Each result is a link so you can visit that artwork's product description page and add that baby to your cart! 

## Known Bugs

### Rating In Browser After Purchase, Not Receipt

At this time, the rating option appears as a redirect after successful checkout. This doesn't really give the user time to view or use the art before rating. A better approach would be to add a link to the email receipt with an option to rate later. 

## Future Development

### Socket and Internal Messaging

Another option for future implementation could be an internal messaging system for commissions rather a mailer for all elements. 

## Acknowledgements

Our group would like to thank the following mentors for their help in the development process: David, Arvin, Jeff, Charlie, Andrea, Reinhardt, Travis, Matthew, and many others. A special GREAT BIG thank you to Wakeel for your guidance and help throughout this process as well. Thanks, also, to our wonderful artists who controbuted their BEAUTIFUL work to populate our app: Jesse, Angela, Alysha, and Wesal. 
