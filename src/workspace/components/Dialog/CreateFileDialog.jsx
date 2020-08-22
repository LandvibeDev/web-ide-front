import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import fileAPIs from '../../../common/APIs/fileAPIs';

const useStyles = makeStyles((theme) => ({
  message: {
    color: 'red',
  },
}));

const dialogTitle = {
  saveas: 'Save as',
  file: 'New File',
  directory: 'New Folder',
  rename: 'Rename',
};

const dialogText = {
  saveas: '새로 저장할 파일의 이름을 입력해주세요.',
  file: '새로 만들 파일의 이름을 입력해주세요.',
  directory: '새로 만들 폴더의 이름을 입력해주세요.',
  rename: '변경할 이름을 입력해주세요.',
};

function CreateFileDialog({ type, open, handleClose, handleSubmit }) {
  const classes = useStyles();
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const selectedId = useSelector((state) => state.file.selectedId);
  const handleChange = (e) => {
    setFileName(e.target.value);
  };
  const handleOk = () => {
    if (fileName === '') {
      setMessage('값을 입력해주세요.');
    } else {
      // TODO: 파일 이름 .js 처리 필요 ?
      handleSubmit(fileName);
      setFileName('');
    }
  };

  useEffect(() => {
    if (type === 'rename') {
      fileAPIs
        .get(`/file/${selectedId}`)
        .then((res) => {
          setFileName(res.data.name);
        })
        .catch((error) => console.log(error));
    }
  }, [type, selectedId]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{dialogTitle[type]}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText[type]}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          onChange={handleChange}
          value={fileName}
          onKeyDown={(e) => {
            if (e.keyCode === 13) handleOk();
          }}
        />
        <DialogContentText className={classes.message}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleOk} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFileDialog;
