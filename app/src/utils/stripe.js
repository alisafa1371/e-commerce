import Stripe from "stripe";

//creating Stripe util to use in every place in
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
