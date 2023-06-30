const Stripe = require("stripe");
const products = require("./products");

// initiating Stripe with secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//iffe function for creating products in Stripe dashboard
(async () => {
  //mapping over produts.js file to create product in Stripe
  for (const product of products) {
    const stripeProduct = await stripe.products.create({
      name: product.name,
      default_price_data: {
        currency: product.currency,
        unit_amount_decimal: product.price,
      },
      images: [product.image],
    });
    console.log(stripeProduct.name, ":", stripeProduct.id);
  }
})();
