import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setFindValue, setFindList, setIndex } from '../../modules/finder';
//찾기부분
const Find = withStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

function FindForm({
  handleClose,
  findRef,
  useStyles,
  handleTabKeyDown,
  expanded,
}) {
  const classes = useStyles();
  const [findInput, setFindInput] = useState('');

  const findValue = useSelector((state) => state.finder.find);
  const currentContents = useSelector((state) => state.file.currentContents);
  const findList = useSelector((state) => state.finder.findList);
  const index = useSelector((state) => state.finder.index);
  const range = useSelector((state) => state.finder.range);
  const dispatch = useDispatch();
  const onSetFindValue = (value) => dispatch(setFindValue(value));
  const onSetFindList = (list) => dispatch(setFindList(list));
  const onSetIndex = (index) => dispatch(setIndex(index));

  useEffect(() => {
    if (findValue !== '') {
      const array = [...currentContents.matchAll(findValue)];
      console.log(array.map((idx) => idx.index));
      onSetFindList(array.map((idx) => idx.index));
      onSetIndex(0);
    }
  }, [currentContents, findValue]);

  useEffect(() => {
    // 창 닫았다가 다시 찾기 창 켜도 검색값 남아있음
    if (findInput !== findValue) {
      setFindInput(findValue);
    }
  }, [findValue, findInput]);
  const handleChange = (e) => {
    setFindInput(e.target.value);
    onSetFindValue(e.target.value);
  };

  // replace창도 켜있으면 tab key 눌렀을때 replace input으로 focusing
  const handleKeyDown = (e) => {
    if (e.keyCode === 9 && expanded) {
      e.preventDefault();
      handleTabKeyDown();
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      // onSetIndex((index + 1) % findList.length);
      const sel = window.getSelection();

      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const setNextIndex = () => {
    onSetIndex((index + 1) % findList.length);
  };
  const setPrevIndex = () => {
    if (index === 0) onSetIndex(findList.length - 1);
    else onSetIndex((index - 1) % findList.length);
  };
  return (
    <Find>
      <div>
        <Input
          className={classes.input}
          inputRef={findRef}
          value={findInput}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          onKeyDown={handleKeyDown}
        />
        <div
          id="result"
          style={{
            display: 'inline-block',
          }}
        >
          {findList.length === 0
            ? '결과 없음'
            : `${findList.length}의 ${index + 1}`}
        </div>
      </div>
      <Button className={classes.Btn} id="subBtn" onClick={setPrevIndex}>
        <ArrowUpwardIcon />
      </Button>
      <Button className={classes.Btn} id="subBtn" onClick={setNextIndex}>
        <ArrowDownwardIcon />
      </Button>
      <Button onClick={handleClose} className={classes.Btn} id="close">
        <CloseIcon />
      </Button>
    </Find>
  );
}

export default FindForm;
