import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import styles from "../styles/Trans.module.css"
import Link from "next/link"
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Router from 'next/router';

import { Form } from 'react-bootstrap';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
    setLogout,
} from '../components/utils';

export default function Transactions(props) {
    const { baseApiUrl, profile, token } = props;

    const [account_from, setAccFrom] = useState('')
    const [ABA_from, setABAFrom] = useState('')
    const [account_to, setAccTo] = useState('')
    const [ABA_to, setABATo] = useState('')
    const [amount, setAmount] = useState('')
    

    function onLogout(e) {
        setLogout(e)
    }

    async function handleTransfer(e) {
        console.log("In transfer function")
        let data = {"amount": amount, 
        "account_to":account_to, 
        "ABA_to":ABA_to, 
        "account_from":account_from, 
        "ABA_from":ABA_from, 
        "jwt":token}
        const TransferApi = await fetch(`http://localhost:5001/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).catch(error => {
            console.log('Error: !@###@#!', error);
          });
          let result = await TransferApi.json();
          console.log(result)
          if (result[1] == 200) {
            Router.push('/profile');
          } else {
            window.alert("Error");
          }
    }

    return (
        <>
            {!token ?
                <>
                    <h1>Please Login</h1>
                </>
                :
                <div className={styles.transBody}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={styles.transferForm}>
                                <h1 className={styles.cardTitle}>Make a Transfer</h1>
                                <Form method="POST" onSubmit={handleTransfer}>
                                    <Form.Group controlId="account_from" className={styles.columnAlign}>
                                        <Form.Label>Send From?</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="account_from"
                                            placeholder="Account number"
                                            value={account_from}
                                            onChange={e => setAccFrom(e.target.value)}
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="ABA_from" className={styles.columnAlign}>
                                        <Form.Control
                                            type="text"
                                            name="ABA_from"
                                            placeholder="ABA number"
                                            value={ABA_from}
                                            onChange={e => setABAFrom(e.target.value)}
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="account_to" className={styles.columnAlign}>
                                        <Form.Label>Who do you want to send it to?</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="account_to"
                                            placeholder="Account number"
                                            value={account_to}
                                            onChange={e => setAccTo(e.target.value)}
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="ABA_to" className={styles.columnAlign}>
                                        <Form.Control
                                            type="text"
                                            name="ABA_to"
                                            placeholder="ABA number"
                                            value={ABA_to}
                                            onChange={e => setABATo(e.target.value)}
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="amount" className={styles.columnAlign}>
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="amount"
                                            placeholder="Enter amount in $"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <div className={styles.actionItems}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Send Money
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={styles.transferForm}>
                                <h1 className={styles.cardTitle}>Deposit Checks</h1>
                                <p>Note: Check deposits take 2-3 business days to be processed</p>
                                <Form method="POST">
                                    <Form.Group controlId="email" className={styles.columnAlign}>
                                        <Form.Label>Who do you want to send it to?</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="account_to"
                                            placeholder="Account number"
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="email" className={styles.columnAlign}>
                                        <Form.Control
                                            type="text"
                                            name="account_to"
                                            placeholder="ABA number"
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="email" className={styles.columnAlign}>
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="account_to"
                                            placeholder="Enter amount in $"
                                            className={styles.textField}
                                        />
                                    </Form.Group>
                                    <p> Check Image:
                                        <Button variant="contained" component="label">
                                            Upload Picture
                                            <input type="file" hidden />
                                        </Button>
                                    </p>
                                    <div className={styles.actionItems}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Deposit Check
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={styles.TtoPButtons}>
                            <Link href="/profile" className="btn btn-secondary">
                                <Button variant="contained" color="primary">
                                    Return to Profile
                                </Button>
                            </Link>
                            <Link href="/profile" className="btn btn-secondary">
                                <Button variant="contained" color="secondary" onClick={onLogout}>
                                    Log Out
                                </Button>
                            </Link>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            }
        </>
    )

}

export async function getServerSideProps(context) {
    const { req } = context;
    const { token } = getAppCookies(req);
    //const profile = token ? verifyToken(token.split(' ')[1]) : '';
    return {
        props: {
            token
        },
    };
}
