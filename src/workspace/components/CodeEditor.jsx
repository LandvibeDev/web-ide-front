import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import { CodeEditorView } from './';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  quick: {
    padding: theme.spacing(2),
    borderLeft: '1px solid gray',
    borderBottom: '1px solid gray',
  },
}));

function CodeEditor({ fileName, openFiles }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item xs={11}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label={fileName} />
            </Tabs>
          </AppBar>
        </Grid>
        <Grid item xs={1}>
          <div className={classes.quick}>Quick Icon</div>
        </Grid>
      </Grid>
      <CodeEditorView fileName={fileName} />
    </div>
  );
}
export default CodeEditor;
