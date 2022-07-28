import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";

interface sourceData {
  response_type: string;
  client_id: string;
  redirectUri: string;
  state: string;
  scope: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  const data: sourceData = {
    response_type: "code",
    client_id: "322d130243352487545131001bee844f",
    redirectUri: "https://next-liff-app.herokuapp.com/",
    state: "1w4rfhy7843",
    scope: "profile%20openid%20email"
  }
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
            if (liff.isLoggedIn() === false) {
              liff.login(data);
            }
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
