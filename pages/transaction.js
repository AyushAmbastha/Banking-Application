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
    const { res } = props;

    const [account_from, setAccFrom] = useState('')
    const [ABA_from, setABAFrom] = useState('')
    const [account_to, setAccTo] = useState('')
    const [ABA_to, setABATo] = useState('')
    const [amount, setAmount] = useState('')

    const [account_from_check, setAccFromCheck] = useState('')
    const [account_to_check, setAccToCheck] = useState('')
    const [selectedImage, setImage] = useState()
    

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
        "jwt":res}

        fetch(`http://localhost:5001/update`, {
            method: 'POST',
            credentials: 'omit',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data),
          }).catch(error => {
            console.error('Error:', error);
          });
        
        fetch(`http://localhost:5002/log`, {
            method: 'POST',
            credentials: 'omit',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data),
          }).catch(error => {
            console.error('Error:', error);
          });

        Router.push('/profile')
    }

    const handleImageChange = event => {
        setImage(event.target.files[0])
    }

    const handleCheckDeposit = () => {
        if (!selectedImage) {
            window.alert("Please attach an Image!")
        }

        const formData = new FormData()
        formData.append('account_from', account_from_check)
        formData.append('account_to', account_to_check)
        formData.append('', selectedImage)

        fetch(`http://localhost:5003/file-upload`, {
            method: 'POST',
            credentials: 'omit',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Credentials': true,
                'jwt': res,
            },
            body: formData,
          }).catch(error => {
            console.error('Error:', error);
          });
        
        console.log("image uploaded")
        Router.push('/profile')

    }

    return (
        <>
            {!res ?
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
                                <Form method="POST" onSubmit={handleCheckDeposit}>
                                    <Form.Group controlId="account_from" className={styles.columnAlign}>
                                        <Form.Label>Sender's Information</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="account_from"
                                            placeholder="Account number"
                                            className={styles.textField}
                                            onChange={e => setAccFromCheck(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="account_to" className={styles.columnAlign}>
                                        <Form.Label>Receiver's Information</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="account_to"
                                            placeholder="Account number"
                                            className={styles.textField}
                                            onChange={e => setAccToCheck(e.target.value)}
                                        />
                                    </Form.Group>
                                    <p> Upload Picture :
                                        <Button variant="contained" component="label">
                                            <input 
                                            type="file" 
                                            accept=".png, .jpg, .jpeg"
                                            onChange={handleImageChange} 
                                            />
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
    let res = false
    if (token) {
        res = token
    }
    console.log(res)
    //const profile = token ? verifyToken(token.split(' ')[1]) : '';
    return {
        props: {
            res
        },
    };
}
