import React, { Fragment, useState, useEffect } from 'react';
import { OpenFileTab, Editor, QuickIconTab } from './';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';
import fileAPIs from '../APIs/fileAPIs';

const useStyles = makeStyles((theme) => ({
  openFIleTab: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Workspace() {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const { currentFile, openFiles } = useSelector((state) => ({
    currentFile: state.currentFile,
    openFiles: state.openFiles,
  }));

  useEffect(() => {
    if (currentFile.id !== null) {
      if (file !== null && file.id === currentFile.id) return;
      fileAPIs
        .get(`/file/${currentFile.id}`)
        .then((res) => {
          setFile(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (file !== null) setFile(null);
  }, [currentFile, file]);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={11} className={classes.openFileTab}>
          <OpenFileTab
            currentFile={currentFile}
            openFiles={openFiles}
            setCurrentFile={setFile}
          />
        </Grid>
        <Grid item xs={1}>
          <QuickIconTab />
        </Grid>
      </Grid>
      <Editor file={file} />
    </Fragment>
  );
}

export default Workspace;
