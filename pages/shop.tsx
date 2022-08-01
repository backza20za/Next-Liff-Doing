import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux'
import { bookSelector } from '../store/Slices/bookSlice'
import React from 'react';




const Shop: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
    liff,
    liffError
}) => {
    const getBooks = useSelector(bookSelector)
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
