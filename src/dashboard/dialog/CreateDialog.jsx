import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from '@material-ui/core';
import Api from '../APIs/WebIDE';

function CreateDialog(props) {
  const [projectValues, setProjectValues] = useState({
    name: '',
    description: '',
    type: '',
  });

  const handleProjectValues = (key) => (evt) => {
    setProjectValues({ ...projectValues, [key]: evt.target.value });
  };

  const onClickCreateProject = (e) => {
    e.preventDefault();

    Api({
      method: 'POST',
      url: '/projects',
      header: {
        'Content-Type': 'multipart/form-data',
      },
      data: projectValues,
    })
      .then((res) => {
        props.history.push(`/workspace/${res.data.id}`);
        console.log('성공');
      })
      .catch((error) => {
        console.log('실패');
      });
  };

  return (
    <Dialog
      open={props.isOpenCreate}
      onClose={props.onClickCloseCreate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Option</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Project Name"
          type="name"
          onChange={handleProjectValues('name')}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          onChange={handleProjectValues('description')}
        />
        <img src="" alt="Node.js logo" />
        <InputLabel>Version</InputLabel>
        <Select
          id="type"
          value={projectValues.type}
          onChange={handleProjectValues('type')}
        >
          <MenuItem value={'nodejs:10'}>10</MenuItem>
          <MenuItem value={'nodejs:12'}>12</MenuItem>
          <MenuItem value={'nodejs:14'}>14</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClickCreateProject}
          color="primary"
          variant="contained"
        >
          Create
        </Button>
        <Button
          onClick={props.onClickCloseCreate}
          color="secondary"
          autoFocus
          variant="contained"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default withRouter(CreateDialog);
