import React, { useEffect } from 'react';
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

  useEffect(() => {
    window.addEventListener('beforeunload', function (event) {
      event.returnValue = 'workspace에서 나가시겠습니까?';
    });
    return () => {
      window.removeEventListener('beforeunload', function (event) {
        event.returnValue = 'workspace에서 나가시겠습니까?';
      });
    };
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <Body />
    </div>
  );
}

export default WorkSpaceMain;
