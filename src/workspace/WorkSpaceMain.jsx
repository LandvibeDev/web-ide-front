import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Body, Terminal } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
  },
  body: {
    height: '71vh',
    borderBottom: '1px solid gray',
    position: 'relative',
  },
  terminal: {
    height: '25vh',
  },
}));

function WorkSpaceMain(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.body}>
        <Body />
      </div>
      <div className={classes.terminal}>
        <Terminal />
      </div>
    </div>
  );
}

export default WorkSpaceMain;
