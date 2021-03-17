import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import styles from "../styles/Profile.module.css"
import Link from "next/link"
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useState } from 'react';

import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
    setLogout,
} from '../components/utils';

export default function Profile(props) {
    const { baseApiUrl, profile } = props;
    const [balance, setBalance] = useState('')
    const [accTransactions, setAccTransactions] = useState('')

    function onLogout(e) {
        setLogout(e)
    }

    async function getTransactionLog() {
        let data = profile.id
        const TransactionLogAPI = await fetch(`http://localhost:5002/mylog`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile.id),
        }).catch(error => {
            console.error('Error:', error);
        });
        const result = await TransactionLogAPI.json();
        if (!result) {
            window.alert("Error while retrieving transaction log");
        }
        var transactionsHTML = ""
        function displayTransactions(item, index) {
            transactionsHTML += "<Grid item xs={12}><Paper className={styles.transactions}><p>Date: ";
            transactionsHTML += item.date;
            // Are we sending or receiving
            if(item.account_from == profile.account_from) {
                transactionsHTML += " Send to: ";
                transactionsHTML += item.account_to;
            } else {
                transactionsHTML += " Receive from: ";
                transactionsHTML += item.account_from;
            }
            transactionsHTML += " Amount: ";
            transactionsHTML += item.amount;
            transactionsHTML += " </p></Paper></Grid>";
        }
        result.forEach(displayTransactions);
        setAccTransactions(transactionsHTML);
        return transactionsHTML;
    }

    async function getBalance() {
        let data = profile.id
        const balanceAPI = await fetch(`http://localhost:5001/balance/123456781`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).catch(error => {
            console.error('Error:', error);
        });
        const result = await balanceAPI.json();
        if (!result) {
            window.alert("Error while retrieving balance information");
        }
        setBalance(result[0])
        return result[0]
    }

    const res = getBalance()
    const transactions_res = getTransactionLog();

    return (
        <>
            {!profile ?
                <>
                    <h1>Please Login</h1>
                </>
                :
                <div className={styles.profileBody}>
                    <Grid container>

                        <Grid item xs={6}>
                            <p align="center">Date: {new Date().toLocaleString()}</p>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <div className={styles.gridBtn}>
                            <Grid item xs={1.5}>
                                <Link href="/transaction">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    >
                                        Transfer Money
                                    </Button>
                                </Link>
                            </Grid>
                        </div>
                        <div className={styles.gridBtn}>
                            <Grid item xs={1.5}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PhotoCamera />}
                                >
                                    Upload
                                </Button>
                            </Grid>
                        </div>
                        <div className={styles.gridBtn}>
                            <Grid item xs={1.5}>
                                <Link href="/">
                                    <Button variant="contained" color="secondary" onClick={onLogout}>
                                        Logout
                                    </Button>
                                </Link>
                            </Grid>
                        </div>
                        <Grid item xs={6}>
                            <h2 align="center">Account Details</h2>
                            <p align="center"> Account Number: {profile.id}</p>
                            <p align="center"> Email ID: {profile.email}</p>
                            <p align="center"> First Name: Fetch </p>
                            <p align="center"> Last Name: Fetch </p>
                            <p align="center"> IFSC Code: BOMT008345 </p>
                            <p align="center"> Rounting Number: 978645362  </p>

                        </Grid>
                        <Grid item xs={6}>
                            <div className={styles.balanceContainer}>
                                <div className={styles.balance}>
                                    <p>Checking Account</p>
                                    <p>$ {balance ? balance : "Err"}</p>
                                </div>
                                <div className={styles.balance}>
                                    <p>Savings Account</p>
                                    <p>$ 1000</p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={3} />
                        <Grid item xs={6}>
                            <h2 align="center">Recent Transanctions</h2>
                        </Grid>
                        <Grid item xs={3} className={styles.downloadBtn}>
                            <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />}>
                                Download
                  </Button>
                        </Grid>
                        {accTransactions ? accTransactions : "<Grid item xs={12}><Paper className={styles.transactions}><p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p></Paper></Grid>"}
                        <Grid item xs={9}></Grid>

                    </Grid>
                </div>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { origin } = absoluteUrl(req);

    const baseApiUrl = `${origin}/api`;

    const { token } = getAppCookies(req);
    const profile = token ? verifyToken(token.split(' ')[1]) : '';
    return {
        props: {
            baseApiUrl,
            profile,
        },
    };
}