import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  input: {
    border: 'none',
    padding: '5px 10px',
    width: '100%',
  },
  form: {
    width: '100%',
  },
}));

function InputPrompt({ submit }) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    submit(value);
    setValue('');
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControlLabel
          control={
            <InputBase
              placeholder="입력"
              className={classes.input}
              onChange={handleChange}
              value={value}
            />
          }
          label="$"
          labelPlacement="start"
          className={classes.form}
        />
      </form>
    </div>
  );
}

export default InputPrompt;
