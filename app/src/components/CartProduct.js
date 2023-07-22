import {
  MinusSmallIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { currencyFormat } from "simple-currency-format";
import CartContext from "src/context/CartContext";

function CartProduct({ product, ProductQuantity }) {
  const { addItemToCart, removeItemFromCart, removeItemEntirely } =
    useContext(CartContext);
  return (
    <div
      className="bg-white p-6 flex items-center space-x-4 justify-between
    hover:shadow-lg hover:border-opacity-50 border-opacity-0 rounded-md hover:cursor-pointer"
    >
      <Link
        href={`/products/${product.id}`}
        className="flex items-center space-x-4 hover:underline group"
      >
        <Image
          width={48}
          height={48}
          src={product.image}
          alt={product.name}
          style={{ objectFit: "contain" }}
        />
        <p className="text-xl">{product.name}</p>
      </Link>
      <div className="flex items-center justify-center gap-3">
        <button
          className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500"
          onClick={() => removeItemFromCart(product)}
        >
          <MinusSmallIcon className="w-6 h-6 flex-shrink-0" />
        </button>
        <span>{ProductQuantity}</span>
        <button
          className="p-1 rounded-md hover:bg-lime-300 hover:text-lime-800"
          onClick={() => addItemToCart(product)}
        >
          <PlusSmallIcon className="w-6 h-6 flex-shrink-0" />
        </button>
        <XMarkIcon className="hidden w-4 h-4 text-gray-500 sm:inline-block" />
        <p className="font-semibold text-xl flex items-center">
          {currencyFormat(
            product.price,
            "en-US",
            product?.currency.toUpperCase()
          )}
        </p>
        <button
          className="hover:text-red-500 border rounded-full p-1
         hover:border-red-500 group"
          onClick={() => removeItemEntirely(product)}
        >
          <XMarkIcon className="w-3 h-3 flex-shrink-0 opacity-50 group-hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
