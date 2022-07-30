import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { authSelector } from '../store/Slices/authSlice'
import { useSelector } from 'react-redux'



function createData(
    userId: string,
    displayName?: string,
    pictureUrl?: string,
    statusMessage?: string,
    email?: string,
    OS?: any
) {
    return { userId, displayName, pictureUrl, statusMessage, email, OS };
}


const Profile: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
    liff,
    liffError
}) => {
    const getProfile = useSelector(authSelector)
    const OS = liff.getOS()
    const rows = [
        createData('userId', getProfile.userId),
        createData('displayNameh', getProfile.displayName),
        createData('pictureUrl', getProfile.pictureUrl),
        createData('statusMessage', getProfile.statusMessage),
        createData('email', getProfile.email),
        createData('OS', OS),
    ];
    return (
        <Layout>
            <main className={styles.main}>
                <h1>Profile</h1>
                {liff && (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.userId}</TableCell>
                                        <TableCell align="right">{row.displayName}</TableCell>
                                        <TableCell align="right"> <Avatar src={row.pictureUrl} /></TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.OS}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
            </main>

        </Layout>
    );
};

export default Profile;
