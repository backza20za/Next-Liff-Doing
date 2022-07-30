import "../styles/globals.css";
import type { AppProps } from "next/app";
import { liff, Liff } from "@line/liff";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Provider } from 'react-redux'
import store from '../store/store'
import { checkLogin } from '../store/Slices/authSlice'

interface Data {
  response_type: string;
  client_id: string;
  redirectUri: string;
  state: string;
  scope: string;
}
interface userData {
  userId: string,
  displayName?: string,
  pictureUrl?: string,
  statusMessage?: string,
  email?: string
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
  // const dispatch = useAppDispatch()
  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            if (liff.isLoggedIn() === true) {
              liff
                .getProfile()
                .then((profile) => {
                  console.log(profile.displayName)
                  const userdata: userData = {
                    userId: profile.userId,
                    displayName: profile.displayName,
                    pictureUrl: profile.pictureUrl,
                    statusMessage: profile.statusMessage,
                    email: liff.getDecodedIDToken()?.email
                  }
                  // dispatch(checkLogin(userdata))
                  store.dispatch(checkLogin(userdata))
                })
                .catch((err) => {
                  console.log("error", err);
                });
              console.log(liff.getDecodedIDToken()?.email)
            } else {
              liff.login(data);
            }
            setLiffObject(liff);
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
