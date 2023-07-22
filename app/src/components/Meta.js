import Head from "next/head";

function Meta() {
  return (
    <Head>
      <title>E-Commerce</title>
      {/* query ?v=1 is to override browser cache */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico?v=1" />
    </Head>
  );
}

export default Meta;
