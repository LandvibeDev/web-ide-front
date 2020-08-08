import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { OpenFileTab, Editor, QuickIconTab } from './';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  openFIleTab: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Workspace() {
  const classes = useStyles();
  const { name, openFiles } = useSelector((state) => ({
    name: state.currentFileName,
    openFiles: state.openFiles,
  }));

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={11} className={classes.openFileTab}>
          <OpenFileTab fileName={name} openFiles={openFiles} />
        </Grid>
        <Grid item xs={1}>
          <QuickIconTab />
        </Grid>
      </Grid>
      <Editor fileName={name} />
    </Fragment>
  );
}

export default Workspace;
