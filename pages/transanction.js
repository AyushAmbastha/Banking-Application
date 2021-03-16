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

        <Grid item xs={6}>  
            <Paper className={classes.paper}>
                <h2> Online Transfer </h2>
                <p align="center"> Transfer from: getting from backend</p>
                <p align="center"> Available Balance: getting from backend </p>
                <p align="center"> Transfer to: <input></input></p> 
                <p align="center">Transfer Amount: <input></input> </p>
                <Button variant="outlined" color="red">
                  Submit
                </Button>
                <Button variant="outlined" color="red">
                    Cancel
                </Button>
            </Paper>   
              
         
        </Grid> 
        <Grid item xs={6}>
          <Paper className={classes.paper}>
                <h2> Deposit check </h2>
                <p align="center"> Front of Check: <Button variant="contained" component="label">Upload Picture <input type="file" hidden/></Button></p>
                <p align="center"> Back of Check: <Button variant="contained" component="label">Upload Picture <input type="file" hidden/></Button> </p>
                <p align="center"> Deposit Account Number: <input></input></p> 
                <p align="center"> Amount: <input></input> </p>
                <Button variant="outlined" color="red">
                  Submit
                </Button>
                <Button variant="outlined" color="red">
                    Cancel
                </Button>
                
            </Paper>  

        </Grid>
           
      </Grid>
    </div>
  );
}
