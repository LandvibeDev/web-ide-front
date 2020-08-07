import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '50px',
  },
}));

function FileTab(props) {
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
          <Button variant="contained">new</Button>
        </Grid>
        <Grid item>
          <Button variant="contained">re</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default FileTab;
