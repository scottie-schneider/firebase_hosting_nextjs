import Head from "next/head";
import { useContext } from "react";
import { TenantContext } from "../pages/_app";

export default () => {
  // const { tagline } = useContext(TenantContext);
  return (
    <Head>
      <title>{"hi"}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={"test"} />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Head>
  );
};
