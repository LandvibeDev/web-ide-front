import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  quick: {
    padding: theme.spacing(2),
    borderLeft: '1px solid gray',
    borderBottom: '1px solid gray',
  },
}));

function QuickIconTab(props) {
  const classes = useStyles();
  return <div className={classes.quick}>Quick Icon</div>;
}

export default QuickIconTab;
