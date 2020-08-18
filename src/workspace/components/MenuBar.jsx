import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import { selectFile, selectDirectory } from '../modules/reducers';

import { MenuItem } from '.';
import { CreateFileDialog } from '../Dialog';

import fileAPIs from '../APIs/fileAPIs';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function MenuBar({ files, getFiles }) {
  const classes = useStyles();
  const directoryId = useSelector((state) => state.directoryId);

  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileType, setFileType] = useState(null);

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (file) => dispatch(selectFile(file));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));

  const setCurrentInfo = (e) => {
    if (e.type === 'file') {
      fileAPIs
        .get(`/file/${e.id}`)
        .then((res) => {
          onSelectFile(res.data); // 선택한 파일 editor에 보여주기 위해서 설정
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
    }
  };

  // file menu
  const handleFileDialogClose = () => {
    setFileDialogOpen(false);
  };

  const handleFileDialogSubmit = (value) => {
    fileAPIs
      .post('file', {
        name: value,
        type: fileType,
        permission: 777,
        parentId: directoryId,
        contents: '',
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

  // control menu item
  const handleFileItemClick = (event) => {
    if (event === 'New File') {
      setFileType('file');
      setFileDialogOpen(true);
    } else if (event === 'New Folder') {
      setFileType('directory');
      setFileDialogOpen(true);
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
      <CreateFileDialog
        open={fileDialogOpen}
        handleClose={handleFileDialogClose}
        handleSubmit={handleFileDialogSubmit}
        type={fileType}
      />
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
