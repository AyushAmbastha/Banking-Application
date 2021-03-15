import Head from 'next/head'
import { Form } from 'react-bootstrap';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Button from "@material-ui/core/Button";
import { validateFields } from "../components/utils"
import { useRouter } from 'next/router'
import axios from 'axios'
import FLASK_API_URL from '../components/utils'
import Router from 'next/router';
import Cookies from 'js-cookie';

import ProfileBox from '../components/profile'

import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from '../components/utils';


export default function Login(props) {
  const router = useRouter()
  const { baseApiUrl, profile } = props;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    const fieldsToValidate = [{ email }, { password }]
    let data = { email, password }

    const allFieldsEntered = validateFields(fieldsToValidate)
    if (!allFieldsEntered) {
      window.alert("Fields can't be empty!")
    }
    else {
      setLoading(!loading)
      const loginApi = await fetch(`${baseApiUrl}/auth`, {
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
      if (result.success && result.token) {
        Cookies.set('token', result.token);
        // window.location.href = referer ? referer : "/";
        // const pathUrl = referer ? referer.lastIndexOf("/") : "/";
        Router.push('/profile');
      } else {
        window.alert("Error while loggin in! Please check your email/password");
      }
      setLoading(false);
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
                <Form method="POST" onSubmit={handleLogin}>
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
