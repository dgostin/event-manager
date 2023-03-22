import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px"
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingLeft: "100px",
    paddingRight: "100px",
  }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Event Manager
          </Typography>
          <Button color="inherit" href="/events">Events</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
