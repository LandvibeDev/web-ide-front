import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Body } from './components';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
  },
}));

function WorkSpaceMain(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Body />
    </div>
  );
}

export default WorkSpaceMain;
