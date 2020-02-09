import React, { createContext, useContext } from "react";
import App from "next/app";
import Page from "../components/Page";
import db from "../lib/db";
import absoluteUrl from "next-absolute-url";

const TenantContext = createContext(null);
export { TenantContext };

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const absolute = absoluteUrl(ctx.req);
    let pageProps = {};
    // fallback tenant object used as a default
    let tenantObject = {
      tagline: "Didn't find a url",
      imageURL:
        "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
    };

    try {
      await db("us-central1-wl-test-1.cloudfunctions.net")
        .firestore()
        .collection("tenant")
        .limit(1)
        .get()
        .then(docs => {
          if (docs.empty) {
            tenantObject = {
              tagline: "no doc found",
              imageURL:
                "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
            };
            return;
          }
          docs.forEach(doc => {
            console.log(doc.id, doc.data());
            tenantObject = doc.data();
          });
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log("error!", err);
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let url = absolute;
    let headersHost = ctx.req.headers.host;
    return { pageProps, tenantObject, url, headersHost };
  }

  render() {
    const { Component, pageProps, tenantObject, url } = this.props;

    return (
      <TenantContext.Provider value={tenantObject}>
        <Page tenantObject={tenantObject}>
          <Component {...pageProps} />
        </Page>
      </TenantContext.Provider>
    );
  }
}
