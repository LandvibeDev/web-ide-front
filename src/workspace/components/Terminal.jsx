import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({}));

function Terminal(props) {
  //   const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={2}>
        filetree
      </Grid>
      <Grid item xs={10}>
        body
      </Grid>
    </Grid>
  );
}

export default Terminal;
