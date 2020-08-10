import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch } from 'react-redux';
import { selectFile, selectDirectory, clearFile } from '../modules/reducers';
import fileAPIs from '../APIs/fileAPIs';

function OpenFileTab({ currentFile, openFiles }) {
  const [value, setValue] = React.useState(0);

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (id, name) => dispatch(selectFile(id, name));
  const onSelectDirectory = (id) => dispatch(selectDirectory(id));
  const onClearFile = (id) => dispatch(clearFile(id));

  const setCurrentInfo = (id) => {
    fileAPIs
      .get(`/file/${id}`)
      .then((res) => {
        onSelectFile(res.data.id, res.data.name); // 선택한 파일 editor에 보여주기 위해서 설정
        onSelectDirectory(res.data.parentId); // 선택한 파일의 상위 디렉토리정보를 저장. 이 정보로 파일,폴더 생성할때 parentId 지정
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeOpenFiles = (id) => {
    console.log(id);
    // onClearFile(id);
  };

  const handleChange = (event, newValue) => {
    setCurrentInfo(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    setValue(currentFile.id);
  }, [currentFile]);

  useEffect(() => {
    console.log(openFiles);
  }, [openFiles]);

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
                  <div>
                    {file.name}
                    <IconButton onClick={(e) => removeOpenFiles(file.id)}>
                      <CloseIcon />
                    </IconButton>
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
      ) : null}
    </AppBar>
  );
}
export default OpenFileTab;
