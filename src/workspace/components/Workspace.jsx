import React, { Fragment, useState, useEffect, useCallback } from 'react';
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
  const currentFile = useSelector((state) => state.currentFile);
  const openFiles = useSelector((state) => state.openFiles);
  const directoryId = useSelector((state) => state.directoryId);

  // 에디터에서 보여질 파일 조회
  const getFile = useCallback(async () => {
    try {
      const res = await fileAPIs.get(`/file/${currentFile.id}`);
      setFile(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [currentFile]);

  useEffect(() => {
    if (currentFile.id !== null) {
      if (file !== null && file.id === currentFile.id) return;
      getFile();
    } else if (file !== null) setFile(null);
  }, [currentFile, file, getFile]);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={11} className={classes.openFileTab}>
          <OpenFileTab
            currentFile={currentFile}
            openFiles={openFiles}
            directoryId={directoryId}
            setFile={setFile}
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
