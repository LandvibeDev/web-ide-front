import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));

function TerminalBody(props) {
  const classes = useStyles();
  return <div className={classes.root}>Terminal</div>;
}

export default TerminalBody;
