import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));

function Command(props) {
  const classes = useStyles();
  return <div className={classes.root}>commandr</div>;
}

export default Command;
