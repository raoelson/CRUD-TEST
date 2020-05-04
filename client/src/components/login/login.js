import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, 
    Typography, TextField, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import apiService from '../../services/Api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    apiService.login(values)
    .then(res => {     
       const { status, data } = res;
       if(status === 201 && data.userId > 0)
        {
          localStorage.setItem("token", 1);
          window.location = ('/product');
        }
    })
    .catch(err => {
      const { status, data } = err.response;
        if(status === 403) {
          setErrorMessage(data.error)
        }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>      
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {errorMessage && 
          <Alert variant="filled" severity="error">
              {errorMessage.toUpperCase()}
          </Alert>
        }
        
        <form onSubmit={(e) => onSubmit(e) } className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) =>handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) =>handleChange(e)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Se connecter
          </Button>
          <Grid container>
          </Grid>
        </form>
      </div>
    </Container>
  );
}