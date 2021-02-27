import Head from 'next/head'
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
              <div className={styles.actionItems}>
                <Button variant="primary" type="submit" className={styles.PriBtn}>
                  Login
                </Button>
                <Link href="/register" className="btn btn-secondary">
                  <Button className={styles.SecBtn}>
                    Create Account
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
