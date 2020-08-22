import React, { useState } from 'react';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

// 바꾸기 부분
const Replace = withStyles((theme) => ({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

function ReplaceForm({ replaceRef, useStyles }) {
  const classes = useStyles();
  const [replaceValue, setReplaceValue] = useState('');
  const handleChange = (e) => {
    setReplaceValue(e.target.value);
  };
  return (
    <Replace>
      <div>
        <Input
          className={classes.input}
          inputRef={replaceRef}
          onChange={handleChange}
          value={replaceValue}
        />
        <Button className={classes.Btn} id="subBtn">
          변경
        </Button>

        <Button className={classes.Btn} id="subBtn">
          전체변경
        </Button>
      </div>
    </Replace>
  );
}

export default ReplaceForm;
