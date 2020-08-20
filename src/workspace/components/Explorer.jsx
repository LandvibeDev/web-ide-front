import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FileTree, FileTreeTab, CommandList } from '.';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectFile,
  selectDirectory,
  setSelectedId,
} from '../modules/reducers';
import fileAPIs from '../../common/APIs/fileAPIs';
const useStyles = makeStyles((theme) => ({
  fileTree: {
    height: '71vh',
    borderBottom: '1px solid gray',
  },
  commandList: {
    height: '25vh',
  },
}));

function Explorer({ files, getFiles }) {
  const classes = useStyles();
  const directoryId = useSelector((state) => state.directoryId);
  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (file) => dispatch(selectFile(file));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));
  const onSetSelectedId = (id) => dispatch(setSelectedId(id));

  const setCurrentInfo = (e) => {
    if (e.type === 'file') {
      fileAPIs
        .get(`/file/${e.id}`)
        .then((res) => {
          onSelectFile(res.data); // 선택한 파일 editor에 보여주기 위해서 설정
          onSetSelectedId(res.data.id); // 파일트리 선택id
          if (directoryId !== res.data.parentId)
            onSelectDirectory(res.data.parentId); // 선택한 파일의 상위 디렉토리정보를 저장. 이 정보로 파일,폴더 생성할때 parentId 지정
        })
        .catch((error) => {
          onSelectFile({ id: null, name: null, contents: null }); // TODO : 여기 수정 필요
          console.log(error);
        });
    }
    if (e.type === 'directory' || String(e.id) === '1') {
      // 최상위프로젝트는 directory지정안되서 1로 확인
      if (directoryId !== e.id) onSelectDirectory(e.id); // 선택한 디렉토리정보 저장. 이 정보로 파일,폴더 생성할때 parentId 지정
      onSetSelectedId(e.id);
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
        <FileTree setCurrentInfo={setCurrentInfo} files={files} />
      </div>
      <div className={classes.commandList}>
        <CommandList />
      </div>
    </Fragment>
  );
}

export default Explorer;
