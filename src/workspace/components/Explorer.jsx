import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FileTree, FileTreeTab, CommandList } from '.';

const useStyles = makeStyles((theme) => ({
  fileTree: {
    height: '71vh',
    borderBottom: '1px solid gray',
  },
  commandList: {
    height: '25vh',
  },
}));

function Explorer(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.fileTree}>
        <FileTreeTab />
        <FileTree />
      </div>
      <div className={classes.commandList}>
        <CommandList />
      </div>
    </Fragment>
  );
}

export default Explorer;
