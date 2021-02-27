import Head from 'next/head'
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

export default function Home() {

    const [first_name, setFN] = useState('')
    const [last_name, setLN] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    return (
        <div className={styles.container}>
            <Head>
                <title>BoM - Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.accountContainer}>
                <div className={styles.loginPage}>
                    <div className={styles.loginForm}>
                        <Form>
                            <Form.Group controlId="first_name" className={styles.columnAlign}>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter first name"
                                    value={first_name}
                                    onChange={e => setFN(e.target.value)}
                                    className={styles.textField}
                                />
                            </Form.Group>
                            <Form.Group controlId="last_name" className={styles.columnAlign}>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter last name"
                                    value={last_name}
                                    onChange={e => setLN(e.target.value)}
                                    className={styles.textField}
                                />
                            </Form.Group>
                            <Form.Group controlId="email" className={styles.columnAlign}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={styles.textField}
                                />
                            </Form.Group>
                            <Form.Group controlId="password" className={styles.columnAlign}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className={styles.textField}
                                />
                            </Form.Group>
                            <Form.Group controlId="cpassword" className={styles.columnAlign}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="cpassword"
                                    placeholder="Enter password"
                                    value={cpassword}
                                    onChange={e => setCPassword(e.target.value)}
                                    className={styles.textField}
                                />
                            </Form.Group>
                            <div className={styles.actionItems}>
                            <Button variant="primary" type="submit" className={styles.PriBtn}>
                                Register
                            </Button>
                            <Link href="/">
                            <Button  className={styles.SecBtn}>
                                Login
                            </Button>
                            </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
