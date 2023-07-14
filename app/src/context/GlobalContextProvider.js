import React from "react";
import { CartProvider } from "./CartContext";
function GlobalContextProvider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

export default GlobalContextProvider;
