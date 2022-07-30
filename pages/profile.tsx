import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import React, { useEffect } from 'react'
import Layout from "../components/Layout";

const Profile: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
    liff,
    liffError
}) => {
    return (
        <Layout>
            <main className={styles.main}>
                <h1>Profile</h1>
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
            </main>
        </Layout>
    );
};

export default Profile;
