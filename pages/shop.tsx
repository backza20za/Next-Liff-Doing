import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux'
import { bookSelector } from '../store/Slices/bookSlice'
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';



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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="center">Calories</TableCell>
                                        <TableCell align="center">Fat&nbsp;(g)</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getBooks.addToCard.map((data, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <CardMedia
                                                    component="img"
                                                    height="80"
                                                    width="50"
                                                    image={data.image}
                                                    alt="green iguana"
                                                />
                                            </TableCell>
                                            <TableCell align="right">{data.name}</TableCell>
                                            <TableCell align="right">{data.price}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


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
