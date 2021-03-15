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

export default function Transanction() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 align="center">Make a Transfer</h1>
        </Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={6}>  
            <Paper className={classes.paper}>
                <p align="center"> Transfer from: getting from backend</p>
                <p align="center"> Available Balance: getting from backend </p>
                <p align="center"> Transfer to: <input></input></p> 
                <p align="center">Transfer Amount: getting from backend </p>
            </Paper>     
         
        </Grid> 
        <Grid item xs={3}></Grid>

        {/* <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <p align="center"> Available Balance: getting from backend </p>
        </Grid> 
        <Grid item xs={3}></Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <p align="center"> Transfer to: <input></input></p> 
        </Grid> 
        <Grid item xs={3}></Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <p align="center">Transfer Amount: getting from backend </p>
        </Grid> 
        <Grid item xs={3}></Grid> */}

        <Grid item xs={8}></Grid>
        
        <Grid item xs={4}>
            <Button variant="outlined" color="red">
               Submit
            </Button>
            <Button variant="outlined" color="red">
                Cancel
            </Button>
            
        </Grid> 
           
      </Grid>
    </div>
  );
}
