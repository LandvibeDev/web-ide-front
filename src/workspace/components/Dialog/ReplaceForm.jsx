import React, { useState, useEffect } from 'react';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { setReplaceValue, setFindList, setIndex } from '../../modules/finder';
import { changeFileContents } from '../../modules/reducers';

// 바꾸기 부분
const Replace = withStyles((theme) => ({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

function replaceAt(string, index, length, replace) {
  return (
    string.substring(0, index) + replace + string.substring(index + length)
  );
}

function ReplaceForm({ replaceRef, useStyles }) {
  const classes = useStyles();
  const [replaceInput, setReplaceInput] = useState('');

  const replaceValue = useSelector((state) => state.finder.replace);
  const findValue = useSelector((state) => state.finder.find);
  const currentContents = useSelector((state) => state.file.currentContents);
  const currentFile = useSelector((state) => state.file.currentFile);
  const findList = useSelector((state) => state.finder.findList);
  const index = useSelector((state) => state.finder.index);
  const dispatch = useDispatch();
  const onSetReplaceValue = (value) => dispatch(setReplaceValue(value));
  const onSetFindList = (list) => dispatch(setFindList(list));
  const onSetIndex = (index) => dispatch(setIndex(index));
  const onChangeFileContents = (file) => dispatch(changeFileContents(file));

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

  const replaceOne = () => {
    const newContents = replaceAt(
      currentContents,
      findList[index],
      findValue.length,
      replaceValue,
    );
    const newFindList = findList.filter((item) => item !== findList[index]);
    onChangeFileContents({ id: currentFile.id, contents: newContents });
    if (newFindList.length === index) {
      onSetIndex(index - 1);
    } else if (newFindList.length === 0) {
      onSetIndex(-1);
    }
    onSetFindList(newFindList);
  };
  const replaceAll = () => {
    const newContents = currentContents.split(findValue).join(replaceValue);
    onChangeFileContents({ id: currentFile.id, contents: newContents });
    onSetFindList([]);
    onSetIndex(-1);
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
        <Button className={classes.Btn} id="subBtn" onClick={replaceOne}>
          변경
        </Button>

        <Button className={classes.Btn} id="subBtn" onClick={replaceAll}>
          전체변경
        </Button>
      </div>
    </Replace>
  );
}

export default ReplaceForm;
