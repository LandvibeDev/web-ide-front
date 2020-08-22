import React, { useState, useEffect } from 'react';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { setReplaceValue } from '../../modules/finder';

// 바꾸기 부분
const Replace = withStyles((theme) => ({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

function ReplaceForm({ replaceRef, useStyles }) {
  const classes = useStyles();
  const [replaceInput, setReplaceInput] = useState('');

  const replaceValue = useSelector((state) => state.finder.replace);
  const dispatch = useDispatch();
  const onSetReplaceValue = (value) => dispatch(setReplaceValue(value));

  useEffect(() => {
    // 창 닫았다가 다시 찾기 창 켜도 검색값 남아있음
    if (replaceInput !== replaceValue) {
      setReplaceInput(replaceValue);
    }
  }, [replaceValue, replaceInput]);

  const handleChange = (e) => {
    setReplaceInput(e.target.value);
    onSetReplaceValue(e.target.value);
  };
  return (
    <Replace>
      <div>
        <Input
          className={classes.input}
          inputRef={replaceRef}
          onChange={handleChange}
          value={replaceInput}
          onFocus={(e) => e.target.select()}
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
