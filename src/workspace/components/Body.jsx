import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
  },
}));

function Body(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        filetree
      </Grid>
      <Grid item xs={10}>
        body
      </Grid>
    </Grid>
  );
}

export default Body;
