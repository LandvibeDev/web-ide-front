import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import DeleteDialog from '../dialog/DeleteDialog';
import Api from '../APIs/WebIDE';

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
  deleteButton: {
    marginLeft: '5px',
  },
}));

function DashBoardCard(props) {
  const classes = useStyles();
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const onClickOpenDelete = () => {
    setIsOpenDelete(true);
  };

  const onClickCloseDelete = () => {
    setIsOpenDelete(false);
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
          size="medium"
          variant="contained"
          color="primary"
        >
          Open
        </Button>
        <Button
          className={classes.deleteButton}
          size="medium"
          variant="contained"
          color="secondary"
          onClick={onClickOpenDelete}
        >
          Delete
        </Button>
      </Grid>
      <DeleteDialog
        isOpenDelete={isOpenDelete}
        onClickCloseDelete={onClickCloseDelete}
        DeleteProject={() => onClickDeleteProject(props.id)}
      />
    </Card>
  );
}
export default withRouter(DashBoardCard);
