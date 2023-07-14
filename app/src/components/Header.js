import Link from "next/link";
import Logo from "./Logo";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import CartContext from "src/context/CartContext";
import { currencyFormat } from "simple-currency-format";

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (cart.length !== 0) {
      setCartCount(cart.cartItems.length);

      //total price
      let totalItemsPrice = 0;
      cart.cartItems.map(
        (product) =>
          (totalItemsPrice += product.product.price * product.quantity)
      );
      setTotalPrice(
        currencyFormat(
          totalItemsPrice,
          "en-US",
          cart.cartItems[0]?.product?.currency.toUpperCase()
        )
      );
    }
  }, [cart]);
  return (
    <header className="sticky top-0 shadow z-10 bg-white">
      <div className="container flex mx-auto p-6 justify-between">
        <Logo />
        <Link
          href="/cart"
          className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
        >
          <ShoppingCartIcon className="w-6 h-6 flex-shrink-0 sm:w-7 sm:h-7" />
          <p className="text-sm md:text-lg flex items-center gap-1">
            {totalPrice}
            <span className="text-sm text-gray-500">({cartCount})</span>
          </p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
