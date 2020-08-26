import React, { useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

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

  const findValue = useSelector((state) => state.finder.find);
  const currentContents = useSelector((state) => state.file.currentContents);
  const findList = useSelector((state) => state.finder.findList);
  const index = useSelector((state) => state.finder.index);
  const range = useSelector((state) => state.finder.range);

  const dispatch = useDispatch();
  const onSetFindValue = (value) => dispatch(setFindValue(value));
  const onSetFindList = useCallback((list) => dispatch(setFindList(list)), [
    dispatch,
  ]);
  const onSetIndex = useCallback((index) => dispatch(setIndex(index)), [
    dispatch,
  ]);

  const selectionAddRange = () => {
    if (findList.length !== 0 && range !== null) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  useEffect(() => {
    //contents, findvalue 변경시
    if (findValue !== '') {
      const array = [...currentContents.matchAll(findValue)];
      onSetFindList(array.map((idx) => idx.index));
      onSetIndex(0);
    } else {
      onSetFindList([]);
      onSetIndex(-1);
    }
  }, [currentContents, onSetFindList, onSetIndex, findValue]);

  const handleChange = (e) => {
    // TODO ? \ . ( 같은 문자 들어오면 String.match, String.matchAll함수는 findValue를 정규식으로 읽어와서?? 오류생김 해결필요
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
      selectionAddRange();
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
          value={findValue}
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
