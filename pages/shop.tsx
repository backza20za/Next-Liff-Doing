import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as React from 'react'
import Layout from "../components/Layout";
import { useSelector } from 'react-redux'
import { bookSelector } from '../store/Slices/bookSlice'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';



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
                        <TableBody>
                            {getBooks.addToCard.map((data, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <img src={data.image} width={50} height={50} />
                                        </TableCell>
                                        <TableCell>
                                            <h4>{data.name}</h4>
                                        </TableCell>
                                        <TableCell><h6>{data.price}฿</h6></TableCell>

                                    </TableRow>
                                )
                            })}


                        </TableBody>
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
