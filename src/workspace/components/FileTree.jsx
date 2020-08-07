import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FileTreeView, FileTab } from './';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

function FileTree(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FileTab />
      <FileTreeView />
    </div>
  );
}

export default FileTree;
