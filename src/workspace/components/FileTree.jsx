import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));

function Body(props) {
  const classes = useStyles();
  return <div className={classes.root}>filetree</div>;
}

export default Body;
