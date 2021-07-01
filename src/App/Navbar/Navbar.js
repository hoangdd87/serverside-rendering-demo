import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'white',
    marginRight: 20,
    textDecoration: 'none'
  },
  highLight: {
    backgroundColor: 'gray',
    padding: '5px 10px',
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          className={
            classNames({
              [classes.title]: true,
              [classes.highLight]: pathname === '/'
            })
          }
          component={ Link }
          to="/"
          color="textPrimary"
        >
          Home
        </Typography>
        <Typography
          className={
            classNames({
              [classes.title]: true,
              [classes.highLight]: pathname === '/pokemons'
            })
          }
          component={ Link }
          to="/pokemons"
        >
          Pokemons
        </Typography>
        <Typography
          className={
            classNames({
              [classes.title]: true,
              [classes.highLight]: pathname === '/admin'
            })
          }
          component={ Link }
          to="/admin"
        >
          Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
