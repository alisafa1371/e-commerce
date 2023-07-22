import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import CartProduct from "src/components/CartProduct";
import CartContext from "src/context/CartContext";

function cart() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { cart, cartCount, totalPrice, removeAll } = useContext(CartContext);

  const onCheckout = async () => {
    try {
      setIsRedirecting(true);
      const { data } = await axios.post("/api/checkout-sessions", cart);
      //here we get the response from the request we get from what request we sent in /api/checkout-sessions
      if (data.message.message === "successfull") {
        toast.success("Your checkout has been done", {
          duration: 2000,
        });

        removeAll();
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <div className="container lg:max-w-screen-xl mx-auto py-12 px-6">
      {cart === "notSetYet" ? (
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : cart?.cartItems?.length > 0 ? (
        <>
          <h2 className="text-4xl font-semibold">Your shopping cart</h2>
          <p className="mt-1 text-xl">
            {cart?.cartItems?.length} items{" "}
            <button
              className="opacity-50 hover:opacity-100 text-base capitalize"
              onClick={removeAll}
            >
              (clear all)
            </button>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-semibold">
            Your shopping cart is empty
          </h2>
          <p className="mt-1 text-xl">
            Check out our awesome products{" "}
            <Link href="/" className="text-red-500 underline">
              here!
            </Link>
          </p>
        </>
      )}

      {cart?.cartItems?.length > 0 && (
        <div className="mt-12 space-y-4">
          {cart?.cartItems.map((item) => (
            <CartProduct
              key={item.product.id}
              product={item.product}
              ProductQuantity={item.quantity}
            />
          ))}
          <div className="flex flex-col items-end border-t py-4 mt-8">
            <p className="text-xl">
              Total:
              <span className="font-semibold"> {totalPrice}</span>
            </p>
            <button
              className="border rounded py-2 px-6 bg-yellow-500 hover:bg-yellow-600
             border-yellow-500 hover:border-yellow-600 focus:ring-4 focus:outline-none
              focus:ring-opacity-50 focus:ring-yellow-500 text-white transition-colors disabled:opacity-50
              disabled:cursor-not-allowed disabled:hover:bg-yellow-500 mt-4 max-w-max"
              disabled={cartCount < 1}
              onClick={onCheckout}
            >
              {isRedirecting ? "Redirecting..." : "Go to checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default cart;
