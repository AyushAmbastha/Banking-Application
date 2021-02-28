import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
        <Grid item xs={12}><h1 align="center">Banking Application</h1></Grid>
          
        <Grid item xs={6}>
          <p align="center">Date: {new Date().toLocaleString()}</p>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={1.5}>
            <Button variant="outlined" color="primary">
                Profile
            </Button>
        </Grid>
        <Grid item xs={1.5}>
            <Button variant="outlined" color="primary">
                Logout
            </Button>
        </Grid>
        <Grid item xs={6}>
            <h2 align="center">Account Detail</h2>
            <p align="center"> Account Number: getting from backend</p>
            <p align="center"> Bank name: getting from backend </p>
            <p align="center"> IFSC Code: getting from backend </p>
            <p align="center"> Rounting Number: getting from backend  </p>  
        
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={12}>
            <h2 align="center">Recent Transanction</h2>        
        </Grid>
        
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
            </Paper>     
        </Grid>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
            </Paper>       
        </Grid>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
            </Paper>       
        </Grid>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <p>Date: 02/01/2021 Send: getting from backend Amount: getting from backend</p>
            </Paper>       
        </Grid>
        <Grid item xs={9}></Grid>

        <Grid item xs={3}>
            <Button variant="outlined" color="primary">
                Download
            </Button>
        </Grid>
       
      </Grid>
    </div>
  );
}
