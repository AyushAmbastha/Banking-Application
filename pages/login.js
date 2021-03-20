import Head from 'next/head'
import { Form } from 'react-bootstrap';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Button from "@material-ui/core/Button";
import { validateFields } from "../components/utils"
import { useRouter } from 'next/router'
import Router from 'next/router';
import Cookies from 'js-cookie';

import {
  getAppCookies
} from '../components/utils';


export default function Login(props) {
  
  const { res } = props;

  const [username, setUName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    const fieldsToValidate = [{ username }, { password }]
    //let passwordHash = sha512(password)
    let data = { "username":username, "password":password }

    const allFieldsEntered = validateFields(fieldsToValidate)
    if (!allFieldsEntered) {
      window.alert("Fields can't be empty!")
    }
    else {
      setLoading(!loading)
      const loginApi = await fetch(`http://localhost:5004/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).catch(error => {
        console.error('Error:', error);
      });
      let result = await loginApi.json();
      console.log(result)
      if (result[1] == 200) {
        Cookies.set('token', result[0]);
        Router.push('/profile');
      } else {
        window.alert("Error while loggin in! Please check your email/password");
      }
      setLoading(false);
    }
  }

  return (
    <>
        {res ?
            <>
                <h1>You're Already logged in!</h1>
            </>
            :
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
                <Form method="POST" onSubmit={handleLogin}>
                  <Form.Group controlId="username" className={styles.columnAlign}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="username"
                      name="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={e => setUName(e.target.value)}
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

                    <Button variant="contained" color="primary" type="submit">
                      Login
                      </Button>

                    <Link href="/register" className="btn btn-secondary">
                      <Button variant="contained" color="secondary">
                        Create Account
                        </Button>
                    </Link>

                  </div>
                </Form>
              </div>
            </div>
          </div>
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