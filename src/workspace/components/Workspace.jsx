import React, { useState, useEffect, useCallback } from 'react';
import { OpenFileTab, Editor, QuickIconTab } from './';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import { resetChanged } from '../modules/reducers';
import fileAPIs from '../../common/APIs/fileAPIs';
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
  const currentFile = useSelector((state) => state.file.currentFile);
  const openFiles = useSelector((state) => state.file.openFiles);
  const directoryId = useSelector((state) => state.file.directoryId);
  useSelector((state) => state.file.currentContents);
  const dispatch = useDispatch();
  const onResetChanged = (id) => dispatch(resetChanged(id));

  const saveFile = (id, contents) => {
    fileAPIs
      .put(`/file/${id}`, {
        ...file,
        contents: contents,
      })
      .then((res) => {
        onResetChanged(res.data.id);
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
        {!loading && file !== null && openFiles.length !== 0 && (
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
