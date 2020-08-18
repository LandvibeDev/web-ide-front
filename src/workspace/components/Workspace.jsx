import React, { useState, useEffect, useCallback } from 'react';
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
  workspace: {
    height: '100%',
  },
  editor: {
    height: `calc(100% - 51px)`,
  },
}));

function Workspace() {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentFile = useSelector((state) => state.currentFile);
  const openFiles = useSelector((state) => state.openFiles);
  const directoryId = useSelector((state) => state.directoryId);

  const saveFile = (id, contents) => {
    fileAPIs
      .put(`/file/${id}`, {
        ...file,
        contents: contents,
      })
      .then((res) => {
        setFile(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 에디터에서 보여질 파일 조회
  const getFile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fileAPIs.get(`/file/${currentFile.id}`);
      setFile(res.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [currentFile]);

  useEffect(() => {
    if (currentFile.id !== null) {
      if (file !== null && file.id === currentFile.id) return;
      getFile();
    } else if (file !== null) setFile(null);
  }, [currentFile, file, getFile]);

  return (
    <div className={classes.workspace}>
      <Grid container className={classes.tab} id="tab">
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
      <div className={classes.editor}>
        {!loading && file !== null && (
          <Editor
            originFile={file}
            currentFile={
              openFiles.filter((file) => file.id === currentFile.id)[0]
            }
            saveFile={saveFile}
          />
        )}
      </div>
    </div>
  );
}

export default Workspace;
