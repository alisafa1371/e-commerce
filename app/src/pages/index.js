import ProductCard from "src/components/ProductCard";
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
  // the product data is fetching from postman instead of stripe
  try {
    const response = await fetch(
      "https://59ad15ec-7e0a-4806-aece-fdfc109e1111.mock.pstmn.io/getProducts2"
    );
    const products = await response.json();

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
