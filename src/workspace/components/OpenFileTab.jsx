import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import {
  selectFile,
  selectDirectory,
  clearFile,
  setSelectedId,
} from '../modules/reducers';
import fileAPIs from '../../common/APIs/fileAPIs';

const useStyles = makeStyles((theme) => ({
  tab: { textAlign: 'center', position: 'relative' },
  closebtn: {
    marginLeft: 5,
    position: 'relative',
    top: 5,
    borderRadius: '2rem',
    '&:hover': { backgroundColor: 'lightgray' },
  },
}));

function OpenFileTab({ currentFile, openFiles, directoryId, setFile }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null); // material-tab에서 현재탭(파란색)으로 표시되는 값 변수

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (file) => dispatch(selectFile(file));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));
  const onClearFile = (id) => dispatch(clearFile(id));
  const onSetSelectedId = (id) => dispatch(setSelectedId(id));

  // openfiletab으로 바꾸면 workspace로 값 보내서 에디터 내용 변경
  // filetree로 바꾸면 workspace에서 받아온 값 사용
  const setCurrentInfo = (id) => {
    fileAPIs
      .get(`/file/${id}`)
      .then((res) => {
        setFile(res.data);
        onSelectFile(res.data); // 선택한 파일 editor에 보여주기 위해서 설정
        onSetSelectedId(res.data.id);
        if (directoryId !== res.data.parentId)
          onSelectDirectory(res.data.parentId); // 선택한 파일의 상위 디렉토리정보를 저장. 이 정보로 파일,폴더 생성할때 parentId 지정
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseBtnClick = (id, changed) => {
    // TODO : confirm용 dialog컴포넌트 생성
    if (changed) {
      const confirmDialog = window.confirm('저장하지 않고 닫으시겠습니까?');
      if (!confirmDialog) return;
    }
    if (currentFile.id === id) setValue(null);
    onClearFile(id);
  };

  const handleChange = (e, newValue) => {
    // closebtn 눌렸을땐 reducer에서 currentfile 변경해주니깐 제외해줌
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
      if (currentFile.id !== newValue) setCurrentInfo(newValue);
    }
  };

  useEffect(() => {
    setValue(currentFile.id);
  }, [currentFile]);

  return (
    <AppBar position="static" color="default">
      {value !== null ? (
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {openFiles.map((file) => {
            return (
              <Tab
                label={
                  <div className={classes.tab}>
                    <span style={{ color: file.changed ? 'red' : 'black' }}>
                      {file.name}
                    </span>
                    <CloseIcon
                      fontSize="small"
                      onClick={(e) =>
                        handleCloseBtnClick(file.id, file.changed)
                      }
                      className={classes.closebtn}
                    />
                  </div>
                }
                value={file.id}
                key={file.id}
                index={file.id}
                style={{ paddingRight: 0 }}
              />
            );
          })}
        </Tabs>
      ) : (
        <Tabs />
      )}
    </AppBar>
  );
}
export default OpenFileTab;
