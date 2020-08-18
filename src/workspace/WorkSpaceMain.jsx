import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Body } from './components';

import fileAPIs from './APIs/fileAPIs';
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

  const [files, setFiles] = useState(null);

  // 파일트리 전체 파일 조회
  const getFiles = useCallback(async () => {
    try {
      const res = await fileAPIs.get('/files');
      setFiles(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  return (
    <div className={classes.root}>
      <Header files={files} getFiles={getFiles} />
      <Body files={files} getFiles={getFiles} />
    </div>
  );
}

export default WorkSpaceMain;
