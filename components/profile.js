import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import styles from "../styles/Profile.module.css"
import Link from "next/link"
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from './utils';

export default function ProfileBox(props) {
  const { baseApiUrl, profile } = props;

  function onLogout(e){
    setLogout(e)
  }

  return (
    <div className={styles.profileBody}>
      <Grid container>

        <Grid item xs={6}>
          <p align="center">Date: {new Date().toLocaleString()}</p>
        </Grid>
        <Grid item xs={3}></Grid>
        <div className={styles.gridBtn}>
          <Grid item xs={1.5}>
            <Button
              variant="contained"
              color="primary"
            >
              Transfer Money
            </Button>
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
          <p align="center"> Bank name: getting from backend </p>
          <p align="center"> IFSC Code: getting from backend </p>
          <p align="center"> Rounting Number: getting from backend  </p>

        </Grid>
        <Grid item xs={6}></Grid>

        <Grid item xs={3} />
        <Grid item xs={6}>
          <h2 align="center">Recent Transanction</h2>
        </Grid>
        <Grid item xs={3} className={styles.downloadBtn}>
          <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />}>
            Download
            </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.transactions}>
            <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.transactions}>
            <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.transactions}>
            <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.transactions}>
            <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
          </Paper>
        </Grid>
        <Grid item xs={9}></Grid>

      </Grid>
    </div>
  );
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