import React, { useState } from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import DeleteDialog from '../dialog/DeleteDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    width: 250,
    height: 200,
  },
  buttons: {
    marginTop: 10,
  },
  openButton: {
    marginRight: 5,
  },
  deleteButton: {
    marginLeft: 5,
  },
}));

function DashBoardCard() {
  const classes = useStyles();
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const onClickOpenDelete = () => {
    setIsOpenDelete(true);
  };

  const onClickCloseDelete = () => {
    setIsOpenDelete(false);
  };

  return (
    <Card className={classes.root}>
<<<<<<< HEAD
      <CardContent variant={'elevation'} align="center">
        <Typography gutterBottom variant="h5" component="h2">
          project name
        </Typography>
        <Typography variant="body2" color="textSecondary" component="h4">
          project dicription
        </Typography>
      </CardContent>
      <Grid container className={classes.buttons} justify="center">
        <Button
          className={classes.openButton}
          size="medium"
          variant="contained"
          color="primary"
=======
      <CardContent variant={'elevation'}>
        <Typography gutterBottom variant='h5' component='h2'>
          project name
        </Typography>
        <Typography variant='body2' color='textSecondary' component='h4'>
          project dicription
        </Typography>
      </CardContent>
      <Grid className={classes.buttons}>
        <Button
          className={classes.openButton}
          size='medium'
          variant='contained'
          color='primary'
>>>>>>> 1d4dafd6edfa0473d7200959c3e0fc89c80f860c
        >
          Open
        </Button>
        <Button
          className={classes.deleteButton}
<<<<<<< HEAD
          size="medium"
          variant="contained"
          color="secondary"
=======
          size='medium'
          variant='contained'
          color='secondary'
>>>>>>> 1d4dafd6edfa0473d7200959c3e0fc89c80f860c
          onClick={onClickOpenDelete}
        >
          Delete
        </Button>
      </Grid>
      <DeleteDialog
        isOpenDelete={isOpenDelete}
        onClickCloseDelete={onClickCloseDelete}
      />
    </Card>
  );
}
export default DashBoardCard;
