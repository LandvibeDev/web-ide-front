import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectFile,
  selectDirectory,
  clearFile,
  setSelectedId,
  changeFileName,
} from '../modules/reducers';

import { MenuItem } from '.';
import { CreateFileDialog, EditBar } from './Dialog';

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
  const [isEditBarOpen, setEditBarOpen] = useState(false);
  const [editType, setEditType] = useState(null);

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (file) => dispatch(selectFile(file));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));
  const onClearFile = (id) => dispatch(clearFile(id));
  const onSetSelectedId = (id) => dispatch(setSelectedId(id));
  const onChangeFileName = (id, fileName) =>
    dispatch(changeFileName(id, fileName));

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
    // TODO : 관리 (?) 필요..
    const postObj = {
      name: fileName,
      type: fileType === 'saveas' ? 'file' : fileType,
      permission: 777,
      parentId: directoryId,
      contents:
        fileType === 'saveas'
          ? openFiles.filter((file) => file.id === currentFile.id)[0].contents
          : '',
    };
    if (fileType === 'directory') delete postObj.contents; // 폴더는 contents가 없음
    const putObj = {
      name: fileName,
    };

    //dialog 여는 경우중 rename만 put으로 파일 이름만 변경이고, 나머지(new,saveas)는 post로 새 파일 생성
    if (fileType === 'rename') {
      fileAPIs
        .put(`file/${selectedId}`, putObj)
        .then((res) => {
          getFiles();
          onChangeFileName(selectedId, res.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fileAPIs
        .post('file', postObj)
        .then((res) => {
          setCurrentInfo(res.data);
          getFiles();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setFileDialogOpen(false);
  };

  // save file 관련 함수
  const saveFile = (id, file) => {
    // console.log(id, file);
    fileAPIs
      .put(`/file/${id}`, {
        ...file,
        parentId: directoryId,
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
    switch (event) {
      case 'New File':
        setFileType('file');
        setFileDialogOpen(true);
        break;

      case 'New Folder':
        setFileType('directory');
        setFileDialogOpen(true);
        break;

      case 'Save':
        if (currentFile === undefined || currentFile.id === null) {
          alert('파일을 선택해주세요!');
          return;
        }
        saveFile(
          currentFile.id,
          openFiles.filter((file) => file.id === currentFile.id)[0],
        );
        break;

      case 'Save as':
        if (currentFile === undefined || currentFile.id === null) {
          alert('파일을 선택해주세요!');
          return;
        }
        setFileType('saveas');
        setFileDialogOpen(true);
        break;

      case 'Delete':
        if (selectedId === 1) {
          alert('프로젝트 폴더는 삭제할 수 없습니다.');
          return;
        } else if (directoryId === selectedId) {
          alert('폴더 삭제'); // TODO : 폴더 삭제 예외 처리 및 구현
          return;
        } else deleteFile(selectedId);
        break;

      case 'Rename':
        if (selectedId === 1) {
          alert('프로젝트 폴더 정보는 대시보드에서 변경해주세요.');
          return;
        }
        setFileType('rename');
        setFileDialogOpen(true);
        break;
      default:
        break;
    }
  };

  /// Edit 관련
  const handleEditBarClose = () => {
    setEditType(null);
    setEditBarOpen(false);
  };

  const handleEditItemClick = (event) => {
    switch (event) {
      case 'Find':
        setEditType('find');
        setEditBarOpen(true);
        break;
      case 'Replace':
        setEditType('replace');
        setEditBarOpen(true);
        break;
      default:
        break;
    }
  };

  const handleProjectItemClick = (event) => {
    switch (event) {
      case 'Refresh':
        getFiles();
        break;
      default:
        break;
    }
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
      {editType !== null && (
        <EditBar
          open={isEditBarOpen}
          handleClose={handleEditBarClose}
          type={editType}
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
