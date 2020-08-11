import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import { selectFile, selectDirectory, clearFile } from '../modules/reducers';
import fileAPIs from '../APIs/fileAPIs';

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

function OpenFileTab({ currentFile, openFiles, setCurrentFile }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (id, name) => dispatch(selectFile(id, name));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));
  const onClearFile = (id) => dispatch(clearFile(id));

  // openfiletab으로 바꾸면 workspace로 값 보내서 에디터 내용 변경
  // filetree로 바꾸면 workspace에서 받아온 값 사용
  const setCurrentInfo = (id) => {
    fileAPIs
      .get(`/file/${id}`)
      .then((res) => {
        setCurrentFile(res.data);
        onSelectFile(res.data.id, res.data.name); // 선택한 파일 editor에 보여주기 위해서 설정
        onSelectDirectory(res.data.parentId); // 선택한 파일의 상위 디렉토리정보를 저장. 이 정보로 파일,폴더 생성할때 parentId 지정
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseBtnClick = (id) => {
    if (currentFile.id === id) setValue(null);
    onClearFile(id);
  };

  const handleChange = (e, newValue) => {
    // closebtn 눌렸을땐 reducer에서 currentfile 변경해주니깐 제외해줌
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'path')
      setCurrentInfo(newValue);
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
                    <span>{file.name}</span>
                    <CloseIcon
                      fontSize="small"
                      onClick={(e) => handleCloseBtnClick(file.id)}
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
