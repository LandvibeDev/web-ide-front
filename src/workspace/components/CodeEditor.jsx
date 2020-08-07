import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));

function CodeEditor({ fileName, openFiles }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>EditorFileTab :{openFiles} | QuickIcon</div>
      <div>CodeView</div>
      selectFile:{fileName}
    </div>
  );
}

export default CodeEditor;
