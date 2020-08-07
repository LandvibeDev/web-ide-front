import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FileTree } from './';
import { CurrentFileContainer } from '../containers';
const useStyles = makeStyles((theme) => ({
  children: {
    position: 'absolute',
    bottom: 0,
    top: 0,
  },
  left: {
    borderRight: '1px solid gray',
  },
}));

function Body(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.children}>
      <Grid item xs={2} className={classes.left}>
        <FileTree />
      </Grid>
      <Grid item xs={10}>
        <CurrentFileContainer />
      </Grid>
    </Grid>
  );
}

export default Body;
