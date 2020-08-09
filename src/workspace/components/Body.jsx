import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Explorer, BottomPanel, Workspace } from './';
const useStyles = makeStyles((theme) => ({
  body: {
    height: '96vh',
    position: 'relative',
  },
  mainSection: {
    height: '100%',
  },
  explorer: {
    height: '100%',
    borderRight: '1px solid gray',
  },
  workspace: {
    height: '71vh',
    borderBottom: '1px solid gray',
  },
  bottomPanel: {
    height: '25vh',
  },
}));

function Body(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.body}>
      <Grid item xs={2}>
        <div className={classes.explorer}>
          <Explorer />
        </div>
      </Grid>
      <Grid item xs={10} className={classes.mainSection}>
        <div className={classes.workspace}>
          <Workspace />
        </div>
        <div className={classes.bottomPanel}>
          <BottomPanel />
        </div>
      </Grid>
    </Grid>
  );
}

export default Body;
