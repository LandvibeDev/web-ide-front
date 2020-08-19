import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import DeleteDialog from '../dialog/DeleteDialog';
import Api from '../../common/APIs/WebIDE';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
    width: '250px',
    height: '200px',
  },
  buttons: {
    marginTop: '10px',
  },
  openButton: {
    marginRight: '5px',
  },
  updateButton: {
    marginRight: '5px',
  },
  deleteButton: {
    marginLeft: '0px',
  },
}));

function ProjectItemCard(props) {
  const classes = useStyles();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [updateProjectValues, setUpdateProjectValues] = useState({
    name: '',
    description: '',
    type: '',
  });

  const handleUpdateProjectValues = (key) => (evt) => {
    setUpdateProjectValues({ ...updateProjectValues, [key]: evt.target.value });
  };

  const onClickOpenUpdate = () => {
    setIsOpenUpdate(true);
  };

  const onClickCloseUpdate = () => {
    setIsOpenUpdate(false);
  };

  const onClickOpenDelete = () => {
    setIsOpenDelete(true);
  };

  const onClickCloseDelete = () => {
    setIsOpenDelete(false);
  };

  const onClickUpdateProject = (pid, updateProjectValues) => {
    setIsOpenUpdate(false);

    if (updateProjectValues.name === '') {
      updateProjectValues.name = props.name;
    }
    if (updateProjectValues.description === '') {
      updateProjectValues.description = props.description;
    }
    if (updateProjectValues.type === '') {
      updateProjectValues.type = props.type;
    }

    console.log(updateProjectValues);
    Api({
      method: 'PUT',
      url: `/projects/${pid}`,
      data: updateProjectValues,
    })
      .then((res) => {
        props.history.replace('/dashboard');
        console.log('성공');
      })
      .catch((error) => {
        console.log('실패');
      });
  };

  const onClickDeleteProject = (pid) => {
    setIsOpenDelete(false);
    Api({
      method: 'DELETE',
      url: `/projects/${pid}`,
    })
      .then((res) => {
        props.history.replace('/dashboard');
        console.log('성공');
      })
      .catch((error) => {
        console.log('실패');
      });
  };

  return (
    <Card className={classes.root}>
      <CardContent variant={'elevation'} align="center">
        <Typography gutterBottom variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="h4">
          {props.description}
        </Typography>
      </CardContent>
      <Grid container className={classes.buttons} justify="center">
        <Button
          className={classes.openButton}
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            props.history.push(`/workspace/${props.id}`);
          }}
        >
          Open
        </Button>
        <Button
          className={classes.updateButton}
          size="small"
          variant="contained"
          color="default"
          onClick={onClickOpenUpdate}
        >
          Update
        </Button>
        <Button
          className={classes.deleteButton}
          size="small"
          variant="contained"
          color="secondary"
          onClick={onClickOpenDelete}
        >
          Delete
        </Button>
      </Grid>
      <Dialog open={isOpenUpdate} onClose={onClickCloseUpdate}>
        <DialogTitle>Option</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="name"
            defaultValue={props.name}
            onChange={handleUpdateProjectValues('name')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            defaultValue={props.description}
            fullWidth
            onChange={handleUpdateProjectValues('description')}
          />
          <img src="" alt="Node.js logo" />
          <InputLabel>Version</InputLabel>
          <Select
            id="type"
            defaultValue={props.type}
            onChange={handleUpdateProjectValues('type')}
          >
            <MenuItem value={'nodejs:10'}>10</MenuItem>
            <MenuItem value={'nodejs:12'}>12</MenuItem>
            <MenuItem value={'nodejs:14'}>14</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => onClickUpdateProject(props.id, updateProjectValues)}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
          <Button
            onClick={onClickCloseUpdate}
            color="secondary"
            autoFocus
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteDialog
        isOpenDelete={isOpenDelete}
        onClickCloseDelete={onClickCloseDelete}
        DeleteProject={() => onClickDeleteProject(props.id)}
      />
    </Card>
  );
}
export default withRouter(ProjectItemCard);
