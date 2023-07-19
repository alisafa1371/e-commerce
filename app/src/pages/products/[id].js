import React from "react";

function ProductPage({ product }) {
  return <div>ProductPage</div>;
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
