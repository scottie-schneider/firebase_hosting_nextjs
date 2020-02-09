import React, { createContext } from "react";
import App from "next/app";
import Page from "../components/Page";
import firebase from "../lib/db";

const TenantContext = createContext(null);
export { TenantContext };

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    // fallback tenant object used as a default
    let tenantObject = {
      tagline: "Didn't find a url",
      imageURL:
        "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
    };

    try {
      await firebase
        .firestore()
        .collection("tenants")
        .doc(ctx.req.headers.host)
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("no such document!");
            return;
          } else {
            tenantObject = documentSet.data();
          }
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log("error!", err);
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let url = ctx.req.headers.host;
    return { pageProps, tenantObject, url };
  }

  render() {
    const { Component, pageProps, tenantObject } = this.props;

    return (
      <TenantContext.Provider value={tenantObject}>
        <Page tenantObject={tenantObject}>
          <Component {...pageProps} />
        </Page>
      </TenantContext.Provider>
    );
  }
}
