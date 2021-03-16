import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import styles from "../styles/Trans.module.css"
import Link from "next/link"
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Form } from 'react-bootstrap';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
    setLogout,
} from '../components/utils';

export default function Transactions(props) {
    const { baseApiUrl, profile } = props;

    function onLogout(e) {
        setLogout(e)
    }

    return (
        <>
            {!profile ?
                <>
                    <h1>Please Login</h1>
                </>
                :
                <div className={styles.transBody}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={styles.transferForm}>
                                <h1 className={styles.cardTitle}>Make a Transfer</h1>
                                <Form method="POST">
                                    <Form.Group controlId="email" className={styles.columnAlign}>
                                        <Form.Label>Choose which account to send from?</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="account_to"
                                            placeholder="Checking Account"
                                            disabled={true}
                                            className={styles.textField}
                                        />
                                    </Form.Group>
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
                                    <Form.Group controlId="password" className={styles.columnAlign}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
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
                                    <Form.Group controlId="password" className={styles.columnAlign}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
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
