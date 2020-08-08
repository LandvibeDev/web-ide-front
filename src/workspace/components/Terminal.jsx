import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputPrompt, OutputLog } from './';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));

function Terminal(props) {
  const classes = useStyles();
  const [outputLog, setOutputLog] = useState('');

  const addOutputLog = (input) => {
    const newLog = outputLog + '\n' + input;
    setOutputLog(newLog);
  };

  return (
    <div className={classes.root}>
      <OutputLog data={outputLog} />
      <InputPrompt submit={addOutputLog} />
    </div>
  );
}

export default Terminal;
