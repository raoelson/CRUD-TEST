import React from 'react';
import './App.css';
import { AppBar, Container, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductList from './components/products/productList';
import { NavBar } from './partials/NavBar';
import { Footer } from './partials/Footer';
import CreateProduct from './components/products/createProduct';
import EditProduct from './components/products/editProduct';
import { PrivateRoute } from './partials/PrivateRoute';
import Login from './components/login/login';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
      <NavBar></NavBar>
      </AppBar>
      {/* content unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Switch>
          <Route exact path='/' component={Login} />          
          <Route exact path='/login' component={Login} />
          {/* <Route exact path='/create' component={CreateProduct} /> */}
          <PrivateRoute path='/product' component={ProductList} />
          <Route exact path='/edit/:id' component={EditProduct} />
          <PrivateRoute path='/create' component={CreateProduct} />
        </Switch>
      </Container>
      {/* End content */}
      
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Footer></Footer>
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
    </Router>
  );
}