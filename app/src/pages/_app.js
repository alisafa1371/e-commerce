import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Layout from "src/components/Layout";
import "src/styles/globals.css";
import { CartProvider } from "use-shopping-cart";
import store from "../../store";
import GlobalContextProvider from "src/context/GlobalContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </GlobalContextProvider>
    </Provider>
  );
}
