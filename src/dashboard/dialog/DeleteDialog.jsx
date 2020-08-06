import React from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

function DeleteDialog(props) {
  return (
    <Grid>
      <Dialog open={props.openDelete} onClose={props.onClickCloseDelete}>
        <DialogTitle id='alert-dialog-title'>{'삭제하시겠습니까?'}</DialogTitle>
        <DialogActions>
          <Button
            onClick={props.onClickCloseDelete}
            color='primary'
            variant='contained'
          >
            Cancel
          </Button>
          <Button
            onClick={props.onClickCloseDelete}
            color='secondary'
            autoFocus
            variant='contained'
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default DeleteDialog;
