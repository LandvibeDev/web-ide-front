import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FileTree, FileTreeTab, CommandList } from '.';
import { useSelector, useDispatch } from 'react-redux';

import { selectFile, selectDirectory } from '../modules/reducers';
import fileAPIs from '../APIs/fileAPIs';
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
  const [files, setFiles] = useState(null);
  const currentFile = useSelector((state) => state.currentFile);
  const directoryId = useSelector((state) => state.directoryId);

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

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (id, name) => dispatch(selectFile(id, name));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));

  const setCurrentInfo = (e) => {
    if (e.type === 'file') {
      fileAPIs
        .get(`/file/${e.id}`)
        .then((res) => {
          onSelectFile(res.data.id, res.data.name); // 선택한 파일 editor에 보여주기 위해서 설정
          if (directoryId !== res.data.parentId)
            onSelectDirectory(res.data.parentId); // 선택한 파일의 상위 디렉토리정보를 저장. 이 정보로 파일,폴더 생성할때 parentId 지정
        })
        .catch((error) => {
          onSelectFile(e.id, e.name); // TODO : 여기 수정 필요
          console.log(error);
        });
    }
    if (e.type === 'directory' || String(e.id) === '1') {
      // 최상위프로젝트는 directory지정안되서 1로 확인
      if (directoryId !== e.id) onSelectDirectory(e.id); // 선택한 디렉토리정보 저장. 이 정보로 파일,폴더 생성할때 parentId 지정
    }
  };

  return (
    <Fragment>
      <div className={classes.fileTree}>
        <FileTreeTab
          directoryId={directoryId}
          setCurrentInfo={setCurrentInfo}
          getFiles={getFiles}
        />
        <FileTree
          setCurrentInfo={setCurrentInfo}
          currentFile={currentFile}
          directoryId={directoryId}
          files={files}
        />
      </div>
      <div className={classes.commandList}>
        <CommandList />
      </div>
    </Fragment>
  );
}

export default Explorer;
