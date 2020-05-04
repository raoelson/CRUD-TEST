import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Button } from "@material-ui/core";
import { Link as Links } from "react-router-dom";
import Api from '../services/Api';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
}));
export function NavBar(props) {
    const classes = useStyles();
    const _disconnect = () => {
      Api.logout();
      window.location = '/login';
    };
    const afficheBtn = (Api.isAuth()) ? "Déconnexion" : "Connexion";
    return (
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
           TEST
          </Typography>
          <nav>
            <Links to={"/product"} variant="button" color="inherit" className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-button MuiTypography-colorInherit">
              Produit
            </Links>
            <Links to={"/create"} variant="button" color="inherit"  className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-button MuiTypography-colorInherit">
              Nouveau
            </Links>
          </nav>
          <Button href="#" color="inherit" variant="outlined"
            onClick={(e) =>_disconnect()}  
            className={classes.link}>
            {afficheBtn}
          </Button>
        </Toolbar>
    )
}