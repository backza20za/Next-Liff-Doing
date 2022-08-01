import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as React from 'react'
import Layout from "../components/Layout";



const Shop: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
    liff,
    liffError
}) => {

    return (
        <Layout>
            <main className={styles.main}>
                <h1>create-liff-app</h1>
                {liff && (
                    <>
                        <h1>Shop</h1>
                    </>
                )
                }
                {liffError && (
                    <>
                        <p>LIFF init failed.</p>
                        <p>
                            <code>{liffError}</code>
                        </p>
                        <a
                            href="https://developers.line.biz/ja/docs/liff/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LIFF Documentation
                        </a>
                    </>
                )}

            </main>
        </Layout>
    );
};

export default Shop;
