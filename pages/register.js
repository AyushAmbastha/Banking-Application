import Head from 'next/head'
import { Form } from 'react-bootstrap';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Button from "@material-ui/core/Button";
import { validateFields } from "../components/utils"
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Home() {

    const router = useRouter()

    const [first_name, setFN] = useState('')
    const [last_name, setLN] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    const [alertmessage, setAM] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        const fieldsToValidate = [{ first_name }, { last_name }, { email }, { password }, { cpassword }]

        const allFieldsEntered = validateFields(fieldsToValidate)
        if (!allFieldsEntered) {
            window.alert("Fields can't be empty!")
        }
        else if (password !== cpassword) {
            window.alert("Passwords dont match!")
        }
        else {
            console.log("ok")
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BoM - Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.accountContainer}>
                <div className={styles.loginPage}>
                    <Button variant="contained" color="default">
                        <Link href='/'>Back to Homepage</Link>
                    </Button>
                    <div className={styles.loginForm}>
                        <Form onSubmit={handleRegister}>
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

                                <Button variant="contained" color="primary" type="submit">
                                    Register
                                </Button>

                                <Button variant="contained" color="secondary">
                                    <Link href='/login'>Login</Link>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    )
}
