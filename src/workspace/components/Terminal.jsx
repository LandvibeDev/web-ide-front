import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Command, TerminalBody } from './';
const useStyles = makeStyles((theme) => ({
  children: {
    height: '100%',
  },
  left: {
    borderRight: '1px solid gray',
  },
}));

function Terminal(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.children}>
      <Grid item xs={2} className={classes.left}>
        <Command />
      </Grid>
      <Grid item xs={10}>
        <TerminalBody />
      </Grid>
    </Grid>
  );
}

export default Terminal;
