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
    getAppCookies,
    setLogout,
} from '../components/utils';

export default function Profile(props) {
    const { res } = props;
    const [balance, setBalance] = useState('')
    const [profile, setProfile] = useState('')
    const [TransactionLogs, setTransactionLogs] = useState([])

    console.log(res)

    function onLogout(e) {
        setLogout(e)
    }

    async function getBalance() {
        //Need to get customer ID from somewhere to call this query. 
        //Need to send token and if its valid return all info?
        //Change API to just take the JWT token and return balance
        const balanceAPI = await fetch(`http://localhost:5001/balance`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'jwt': res,
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

    async function getProfile() {
        //Need to get customer ID from somewhere to call this query. 
        //Need to send token and if its valid return all info?
        //Change API to just take the JWT token and return balance
        const profileApi = await fetch(`http://localhost:5000/profile`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'jwt': res,
            },
        }).catch(error => {
            console.error('Error:', error);
        });
        const result = await profileApi.json();
        if (profileApi.status != 200) {
            window.alert("Error while retrieving profile info");
        }
        setProfile(result[0])
        console.log(profile)
        return result[0]
    }


    async function getTransactionLogs() {
        const LogsApi = await fetch(`http://localhost:5002/mylog`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'jwt': res,
            },
        }).catch(error => {
            console.error('Error:', error);
        });
        const result = await LogsApi.json();
        if (!result) {
            window.alert("Error while retrieving transaction logs");
        }
        setTransactionLogs(result) //Returning as an indexed structure
        return result[0]
    }

    const balancecaller = getBalance()
    const tlogs = getTransactionLogs()
    const profileInfo = getProfile()

    return (
        <>
            {!res ?
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
                            <p align="center"> First Name: {profile.FirstName ? profile.FirstName : "Err"} </p>
                            <p align="center"> Last Name: {profile.LastName ? profile.LastName : "Err"} </p>
                            <p align="center"> Email ID: {profile.Email ? profile.Email : "Err"}</p>
                            <p align="center"> IFSC Code: BOMT008345 </p>
                            <p align="center"> Routing Number: 978645362  </p>

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

                        <Grid item xs={12}>
                            <h2 align="center">Recent Transanctions</h2>
                        </Grid>

                        {TransactionLogs.map((data) => (
                            <Grid item xs={12}>
                                <Paper className={styles.transactions}>
                                    <p>Account From: {data[3]} Account To: {data[4]} Amount={data[5]}</p>
                                </Paper>
                            </Grid>
                        ))}

                    </Grid>
                </div>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { token } = getAppCookies(req);
    let res = false
    if (token) {
        res = token
    }
    //const profile = token ? verifyToken(token.split(' ')[1]) : '';
    return {
        props: {
            res
        },
    };
}