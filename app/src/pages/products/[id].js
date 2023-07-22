import {
  CheckIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { currencyFormat } from "simple-currency-format";
import CartContext from "src/context/CartContext";

function ProductPage({ product }) {
  const {
    quantity,
    addItemToCart,
    addQuantity,
    subtractQuantity,
    resetSingleProductCardQuantity,
  } = useContext(CartContext);

  const addItemHandler = () => {
    const id = toast.loading(`Adding ${quantity} ${product.name}`);
    addItemToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added `, { id, duration: 1500 });
  };

  //resting quantity to zero  after leaving [id] page
  useEffect(() => {
    //cleanup function
    return () => {
      resetSingleProductCardQuantity();
    };
  }, []);

  return (
    <div className="container lg:max-w-screen-lg mx-auto py-12 px-6">
      <div
        className="flex flex-col md:flex-row justify-between items-center 
      space-y-8 md:space-y-0 md:space-x-12"
      >
        <div className="w-72 h-72 sm:w-96 sm:h-96 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="100%"
            style={{ objectFit: "contain" }}
            priority //load it immediately because it only image in this page
          />
        </div>
        <div className="w-full flex-1 border border-opacity-50 max-w-md rounded-md shadow-lg bg-white p-6">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="flex items-center pt-2 space-x-2">
            <CheckIcon className="w-5 h-5 text-lime-500" />
            <span className="font-semibold">In stock</span>
          </p>
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Price : </p>
            <p className="text-xl font-semibold">
              {currencyFormat(
                product.price,
                "en-US",
                product?.currency.toUpperCase()
              )}
            </p>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Quantity:</p>
            <div className="mt-1 flex items-center space-x-3">
              <button
                className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500"
                onClick={subtractQuantity}
              >
                <MinusSmallIcon className="w-6 h-6 flex-shrink-0" />
              </button>
              <span>{quantity}</span>
              <button
                className="p-1 rounded-md hover:bg-lime-300 hover:text-lime-800"
                onClick={addQuantity}
              >
                <PlusSmallIcon className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>
          </div>
          <button
            className="w-full mt-4 border border-lime-500 py-2 px-6 bg-lime-500 hover:bg-lime-600
           hover:border-lime-600 focus:ring-4 focus:ring-opacity-50
          focus:ring-lime-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-md
          focus:outline-none"
            disabled={quantity === 0}
            onClick={addItemHandler}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  //fetch all products

  /*at the beginning we will have our page with every product we have or fetch from the database. 
  then if we change products in database this page will be updated without needing to rebuild the entire site.  
  this is the benefit of Incremental Static Regeneration (ISR)
  */
  try {
    const response = await fetch(
      "https://59ad15ec-7e0a-4806-aece-fdfc109e1111.mock.pstmn.io/getProducts2"
    );

    const products = await response.json();

    const paths = products.map((product) => ({
      params: { id: String(product.id) },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(
      "https://59ad15ec-7e0a-4806-aece-fdfc109e1111.mock.pstmn.io/getProducts2"
    );
    const products = await response.json();
    const product = products.find((product) => product.id == params.id);
    return {
      props: {
        product,
      },
      revalidate: 60 * 60,
    };
  } catch (error) {
    return {
      props: {
        product: {},
      },
    };
  }
}
export default ProductPage;
