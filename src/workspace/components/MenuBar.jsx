import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectFile,
  selectDirectory,
  clearFile,
  setSelectedId,
} from '../modules/reducers';

import { MenuItem } from '.';
import { CreateFileDialog } from './Dialog';

import fileAPIs from '../../common/APIs/fileAPIs';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function MenuBar({ files, getFiles }) {
  const classes = useStyles();
  const openFiles = useSelector((state) => state.openFiles);
  const currentFile = useSelector((state) => state.currentFile);
  const directoryId = useSelector((state) => state.directoryId);
  const selectedId = useSelector((state) => state.selectedId);

  const [isFileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileType, setFileType] = useState(null);

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (file) => dispatch(selectFile(file));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));
  const onClearFile = (id) => dispatch(clearFile(id));
  const onSetSelectedId = (id) => dispatch(setSelectedId(id));

  /////// new file , folder관련 함수
  const setCurrentInfo = (e) => {
    if (e.type === 'file') {
      fileAPIs
        .get(`/file/${e.id}`)
        .then((res) => {
          onSelectFile(res.data); // 선택한 파일 editor에 보여주기 위해서 설정
          onSetSelectedId(res.data.id);
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
  const handleFileDialogClose = () => {
    setFileType(null);
    setFileDialogOpen(false);
  };
  const handleFileDialogSubmit = (fileName) => {
    fileAPIs
      .post('file', {
        name: fileName,
        type: fileType === 'saveas' ? 'file' : fileType,
        permission: 777,
        parentId: directoryId,
        contents:
          fileType === 'saveas'
            ? openFiles.filter((file) => file.id === currentFile.id)[0].contents
            : '',
      })
      .then((res) => {
        setCurrentInfo(res.data);
        getFiles();
      })
      .catch((error) => {
        console.log(error);
      });
    setFileDialogOpen(false);
  };

  // save file 관련 함수
  const saveFile = (id, file) => {
    // console.log(id, file);
    fileAPIs
      .put(`/file/${id}`, {
        ...file,
        contents: file.contents,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Delete file
  const deleteFile = (id) => {
    fileAPIs
      .delete(`/file/${id}`)
      .then((res) => {
        onClearFile(id); // openFiles에서 삭제, currentFile 변경
        getFiles(); // 삭제된 후 file list 새로 불러옴
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // control menu item
  const handleFileItemClick = (event) => {
    if (event === 'New File') {
      setFileType('file');
      setFileDialogOpen(true);
    } else if (event === 'New Folder') {
      setFileType('directory');
      setFileDialogOpen(true);
    } else if (event === 'File Upload') {
      // TODO : file upload
    } else if (event === 'Save') {
      if (currentFile === undefined || currentFile.id === null) {
        alert('파일을 선택해주세요!');
        return;
      }
      saveFile(
        currentFile.id,
        openFiles.filter((file) => file.id === currentFile.id)[0],
      );
    } else if (event === 'Save as') {
      if (currentFile === undefined || currentFile.id === null) {
        alert('파일을 선택해주세요!');
        return;
      }
      setFileType('saveas');
      setFileDialogOpen(true);
    } else if (event === 'Delete') {
      if (selectedId === 1) {
        alert('프로젝트 폴더는 삭제할 수 없습니다.');
        return;
      } else if (directoryId === selectedId) {
        alert('폴더 삭제'); // TODO : 폴더 삭제 예외 처리 및 구현
        return;
      } else deleteFile(selectedId);
    }
  };
  const handleEditItemClick = (event) => {
    console.log(event);
  };
  const handleProjectItemClick = (event) => {
    console.log(event);
  };

  return (
    <div className={classes.root}>
      {fileType !== null && (
        <CreateFileDialog
          open={isFileDialogOpen}
          handleClose={handleFileDialogClose}
          handleSubmit={handleFileDialogSubmit}
          type={fileType}
        />
      )}
      <MenuItem
        title={
          <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            울림 IDE
          </div>
        }
        type="menuBar"
        MenuItems={[]}
      />
      <MenuItem
        title="File"
        handleItemClick={handleFileItemClick}
        MenuItems={[
          { name: 'New File' },
          { name: 'New Folder' },
          { name: 'Save' },
          { name: 'Save as' },
          { name: 'Delete' },
          { name: 'Rename' },
          { name: 'File Upload' },
        ]}
        type="menuBar"
      />
      <MenuItem
        title="Edit"
        handleItemClick={handleEditItemClick}
        MenuItems={[{ name: 'Find' }, { name: 'Replace' }]}
        type="menuBar"
      />
      <MenuItem
        title="Project"
        handleItemClick={handleProjectItemClick}
        MenuItems={[
          { name: 'Build' },
          { name: 'Run' },
          { name: 'Refresh' },
          { name: 'Configure Environment' },
        ]}
        type="menuBar"
      />
    </div>
  );
}
export default MenuBar;
