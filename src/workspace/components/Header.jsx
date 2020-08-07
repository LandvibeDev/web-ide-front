import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { HeaderMenuList } from './';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid gray',
  },
  logo: {
    padding: theme.spacing(1),
    borderRight: '1px solid gray',
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <div className={classes.logo}>울림 IDE</div>
      <Grid item xs={11}>
        <HeaderMenuList />
      </Grid>
    </Grid>
  );
}

export default Header;
