"use client";

import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setCartFromLocalStorage();
  }, []);

  const setCartFromLocalStorage = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = (product) => {
    const item = product;
    const existingItemIndex = cart?.cartItems?.findIndex(
      (el) => el.product.id === item.id
    );

    let newCartItems;
    if (existingItemIndex !== undefined && existingItemIndex !== -1) {
      console.log(existingItemIndex, "existingItemIndex");
      const updatedCartItems = [...cart.cartItems];

      updatedCartItems[existingItemIndex].quantity++;
      newCartItems = updatedCartItems;
    } else {
      newCartItems = [...(cart?.cartItems || []), { product, quantity: 1 }];
    }
    setCart({ cartItems: newCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartFromLocalStorage();
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
