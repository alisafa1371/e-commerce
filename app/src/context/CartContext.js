"use client";

import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { currencyFormat } from "simple-currency-format";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState("notSetYet");
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const router = useRouter();

  //setting total price
  useEffect(() => {
    if (cart.length !== 0 && cart !== "notSetYet") {
      let count = 0;
      cart?.cartItems.map((item) => (count += item.quantity));
      setCartCount(count);

      //total price
      let totalItemsPrice = 0;
      cart?.cartItems?.map(
        (product) =>
          (totalItemsPrice += product.product.price * product.quantity)
      );
      setTotalPrice(
        currencyFormat(
          totalItemsPrice,
          "en-US",
          cart?.cartItems[0]?.product?.currency.toUpperCase()
        )
      );
    } else {
      setTotalPrice(0);
      setCartCount(0);
    }
  }, [cart]);

  //setting cart from local storage for

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

  //( Actions )

  const addItemToCart = (product, quantity = 1) => {
    const item = product;
    const existingItemIndex = cart?.cartItems?.findIndex(
      (el) => el.product.id === item.id
    );

    let newCartItems;
    if (existingItemIndex !== undefined && existingItemIndex !== -1) {
      const updatedCartItems = [...cart.cartItems];

      updatedCartItems[existingItemIndex].quantity += quantity;
      newCartItems = updatedCartItems;
    } else {
      newCartItems = [...(cart?.cartItems || []), { product, quantity: 1 }];
    }
    setCart({ cartItems: newCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    // setCartFromLocalStorage();
  };
  const removeItemFromCart = (product, quantity = 1) => {
    const item = product;
    const existingItemIndex = cart?.cartItems?.findIndex(
      (el) => el.product.id === item.id
    );

    let newCartItems;
    if (existingItemIndex !== undefined && existingItemIndex !== -1) {
      const updatedCartItems = [...cart.cartItems];
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity -= quantity;
        newCartItems = updatedCartItems;
      } else if (updatedCartItems[existingItemIndex].quantity === 1) {
        updatedCartItems[existingItemIndex].quantity = 0;
        newCartItems = updatedCartItems;
      } else {
        return;
      }
    }
    setCart({ cartItems: newCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartFromLocalStorage();
  };

  const removeItemEntirely = (product) => {
    const filteredList = cart?.cartItems.filter(
      (item) => item.product.id !== product.id
    );

    console.log(filteredList);
    setCart(
      filteredList.length === 0
        ? setCart("notSetYet")
        : { cartItems: filteredList }
    );
    filteredList.length === 0
      ? localStorage.removeItem("cart")
      : localStorage.setItem(
          "cart",
          JSON.stringify({ cartItems: filteredList })
        );
    setCartFromLocalStorage();
  };
  const removeAll = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const addQuantity = () => {
    let newQuantity = quantity;
    setQuantity(++newQuantity);
  };
  const subtractQuantity = () => {
    let newQuantity = quantity;
    setQuantity(--newQuantity);
  };

  const resetSingleProductCardQuantity = () => {
    setQuantity(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalPrice,
        quantity,
        addItemToCart,
        removeItemFromCart,
        removeAll,
        addQuantity,
        subtractQuantity,
        removeItemEntirely,
        resetSingleProductCardQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
