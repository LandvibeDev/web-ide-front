import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setFindValue } from '../../modules/finder';
//찾기부분
const Find = withStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

function FindForm({ handleClose, findRef, useStyles }) {
  const classes = useStyles();
  const [findInput, setFindInput] = useState('');

  const dispatch = useDispatch();
  const onSetFindValue = (value) => dispatch(setFindValue(value));

  const handleChange = (e) => {
    setFindInput(e.target.value);
    onSetFindValue(e.target.value);
  };

  return (
    <Find>
      <div>
        <Input
          className={classes.input}
          inputRef={findRef}
          value={findInput}
          onChange={handleChange}
        />
        <div
          id="result"
          style={{
            display: 'inline-block',
          }}
        >
          결과 없음
        </div>
      </div>
      <Button className={classes.Btn} id="subBtn">
        <ArrowUpwardIcon />
      </Button>
      <Button className={classes.Btn} id="subBtn">
        <ArrowDownwardIcon />
      </Button>
      <Button onClick={handleClose} className={classes.Btn} id="close">
        <CloseIcon />
      </Button>
    </Find>
  );
}

export default FindForm;
