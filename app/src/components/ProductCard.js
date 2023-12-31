import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cartSlice";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import { currencyFormat } from "simple-currency-format";

function ProductCard({ product, index }) {
  const { addItemToCart } = useContext(CartContext);
  const addItemHandler = (e) => {
    e.preventDefault();
    const id = toast.loading(`Adding 1 item`);
    addItemToCart(product);
    toast.success(`${product.name} added `, { id, duration: 1500 });
  };
  return (
    <Link
      href={`/products/${product.id}`} // by using <Link> component and href we are redirecting user to {`/products/${product.id}`} also in pages folder we have product folder and inside it we have [id].js file
      className="border-2 rounded-md group overflow-hidden"
    >
      <div className="relative w-full h-64">
        <Image
          fill // instead of giving width and height
          alt={product.name}
          src={product.image}
          sizes="100%"
          placeholder="blur" //this is for nextJs image priority error
          blurDataURL={product.image} //this is for nextJs image priority error
          style={{
            objectFit: "contain", // for preventing images from starch
          }}
          className="bg-[#F7F7F7]"
        />
      </div>
      <div className="p-6 bg-white h-full">
        <p className="font-semibold text-lg">{product.name}</p>
        <Rating startsAmount={product.rating} id={product.id} />
        <div className="mt-4 flex items-center justify-between gap-5">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">
              {currencyFormat(
                product.price,
                "en-US",
                product?.currency.toUpperCase()
              )}
            </p>
          </div>

          <button
            onClick={addItemHandler}
            className="border rounded-lg py-1 px-4 hover:bg-green-600 hover:text-white transition-all"
          >
            Add to card
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
