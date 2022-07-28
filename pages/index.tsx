import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect } from 'react'

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {liff.isLoggedIn() === true ?
        <main className={styles.main}>
          <h1>create-liff-app</h1>
          {liff && (
            <>
              {/* <p>{liff.isLoggedIn()}</p> */}
              {liff.isLoggedIn() === true ? <p>true</p> : <p>false</p>}
              <p>{liff.getOS()}</p>
            </>
          )
          }
          {liffError && (
            <>
              <p>LIFF init failed.</p>
              <p>
                <code>{liffError}</code>
              </p>
            </>
          )}
          <a
            href="https://developers.line.biz/ja/docs/liff/"
            target="_blank"
            rel="noreferrer"
          >
            LIFF Documentation
          </a>
        </main> : <div></div>
      }

    </div>
  );
};

export default Home;
