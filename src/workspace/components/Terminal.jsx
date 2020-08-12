import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputPrompt, OutputPrompt } from './';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));

function Terminal(props) {
  const classes = useStyles();
  const [output, setOutput] = useState('');

  const addOutput = (input) => {
    const newOutput = output + '\n' + input;
    setOutput(newOutput);
  };

  return (
    <div className={classes.root}>
      <OutputPrompt data={output} />
      <InputPrompt submit={addOutput} />
    </div>
  );
}

export default Terminal;
