import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { toast } from "react-hot-toast";

function ProductCard({ product, index }) {
  const { addItem } = useShoppingCart();

  const addItemHandler = (e) => {
    e.preventDefault();
    const id = toast.loading("Adding 1 item");
    addItem(product);
    toast.success(`${product.name} added `, { id });
  };
  return (
    <Link
      href={`/products/${product.id}`}
      className="border-2 rounded-md group overflow-hidden"
    >
      <div className="relative w-full h-64">
        <Image
          fill // instead of giving width and height
          alt={product.name}
          src={product.image}
          sizes="100%"
          priority={index === 0} // if its the first item from product array load the image immediately (this is for the error : "image was detected as the Largest Contentful Paint.....")
          style={{
            objectFit: "contain", // for preventing images from starch
          }}
          className="bg-[#F7F7F7]"
        />
      </div>
      <div className="p-6 bg-white h-full">
        <p className="font-semibold text-lg">{product.name}</p>
        <Rating />
        <div className="mt-4 flex items-center justify-between gap-5">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">
              {formatCurrencyString({ value: product.price, currency: "USD" })}
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
