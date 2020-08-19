import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MenuBar } from './';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid gray',
  },
}));

function Header({ files, getFiles }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MenuBar files={files} getFiles={getFiles} />
    </div>
  );
}

export default Header;
