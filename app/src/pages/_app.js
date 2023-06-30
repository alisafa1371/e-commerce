import { Toaster } from "react-hot-toast";
import Layout from "src/components/Layout";
import "src/styles/globals.css";
import { CartProvider } from "use-shopping-cart";

export default function App({ Component, pageProps }) {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLICSHARE_KEY;
  return (
    <CartProvider
      stripe={stripePublicKey}
      cartMode="checkout-session"
      currency="USD"
    >
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </CartProvider>
  );
}
