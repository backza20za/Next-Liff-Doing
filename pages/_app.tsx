import "../styles/globals.css";
import type { AppProps } from "next/app";
import { liff, Liff } from "@line/liff";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Provider } from 'react-redux'
import store from '../store/store'

interface Data {
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
  const data: Data = {
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_LIFF_CLIENT_ID!,
    redirectUri: process.env.NEXT_PUBLIC_BASE_URL!,
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
            if (liff.isLoggedIn() === false) {
              liff.login(data);
            } else {
              liff.ready.then(() => {
                if (liff.isLoggedIn() === true) {
                  getprofile()
                }
              });
            }
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });

  }, []);

  const getprofile = async () => {
    const response = await liffObject?.getProfile()
    console.log(response?.displayName)
  }

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;


  return (
    <Provider store={store}>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {liffObject?.isLoggedIn() === true ?

        <Component {...pageProps} />

        :
        <div>กำลังตรวจสอบการ Login</div>
      }
    </Provider>
  );
}

export default MyApp;
