import React, { useState } from 'react';
import { makeStyles, Grid, TextField, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import apiService from '../../services/Api';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function CreateProduct(props) {
  const classes = useStyles();
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  
  const addProduct = () => {
    apiService.addProduit(values)
    .then(res => {
       const { status } = res;
       if(status === 201) 
        props.history.push('/product');
    })
    .catch(err => console.log(err))
  }
  const onSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form onSubmit={(e) => onSubmit(e) }>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="nom"
                name="nom"
                label="Nom"
                onChange={(e) =>handleChange(e)}
                value={values.nom || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="prix"
                name="prix"
                label="Prix"
                onChange={(e) =>handleChange(e)}
                value={values.prix || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="description" name="description" label="Description" fullWidth 
              onChange={(e) =>handleChange(e)}
              value={values.description || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" type="submit">
                  Enregistrer
              </Button>
            </Grid>
          </Grid>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}