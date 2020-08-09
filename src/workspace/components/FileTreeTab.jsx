import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
const useStyles = makeStyles((theme) => ({
  root: {},
}));

function FileTreeTab(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Button variant="outlined">
            <AddIcon color="primary" />
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">
            <RefreshIcon color="primary" />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default FileTreeTab;
