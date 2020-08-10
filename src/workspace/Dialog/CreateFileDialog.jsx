import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  message: {
    color: 'red',
  },
}));

function CreateFileDialog({ type, open, handleClose, handleSubmit }) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleOk = () => {
    if (value === '') {
      setMessage('값을 입력해주세요.');
    } else {
      // TODO: 파일 이름 .js 처리 필요 ?
      handleSubmit(value);
      setValue('');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {type === 'file' ? 'New file' : 'New folder'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          새로 만들 {type === 'file' ? '파일' : '폴더'}의 이름을 입력해주세요.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          onChange={handleChange}
          value={value}
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
