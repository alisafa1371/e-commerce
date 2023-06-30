import ProductCard from "src/components/ProductCard";
import { stripe } from "src/utils/stripe";
export default function Home({ products }) {
  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
      <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products.map((product, index) => {
          return (
            <ProductCard product={product} key={product.id} index={index} />
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const inventory = await stripe.products.list({
    expand: ["data.default_price"], //price is not by default an attribute in product obj so we have to get it like this
    limit: 8,
  });

  try {
    const products = inventory.data.map((product) => {
      const price = product.default_price;
      return {
        name: product.name,
        id: product.id,
        currency: price.currency,
        price: price.unit_amount,
        image: product.images[0],
      };
    });

    return {
      props: {
        products: products,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};
