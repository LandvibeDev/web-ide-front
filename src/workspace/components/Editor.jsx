import React, { useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPrismEditor from 'react-prism-editor';
import { changeFileContents } from '../modules/reducers';
import { useDispatch } from 'react-redux';
import './font.css';

const useStyles = makeStyles((theme) => ({
  editorBody: {
    height: '100%',
    overflow: 'scroll',
    background: '#f5f2f0',
  },
}));

function Editor({ originFile, currentFile, saveFile }) {
  const classes = useStyles();
  const anchorRef = useRef();
  const dispatch = useDispatch();
  const onChangeFileContents = (file) => dispatch(changeFileContents(file));

  const handleKeyDown = useCallback(
    // TODO : 키보드로 에디터 제어
    (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
          case 's':
            event.preventDefault();
            const data = document.querySelector('pre').innerText;
            saveFile(originFile.id, data);
            break;
          default:
            break;
        }
      } else return;
    },
    [originFile, saveFile],
  );

  useEffect(() => {
    const current = document.querySelector('pre');
    anchorRef.current = current;
  });
  useEffect(() => {
    const editor = document.querySelector('pre');
    editor.addEventListener('keydown', handleKeyDown);
    editor.addEventListener('focus', () => {
      const value = editor.value;
      editor.value = '';
      editor.value = value;
    });
    return () => {
      editor.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleFocus = () => {
    anchorRef.current.focus();
    // TODO : 제일 마지막 부분 focus되게 하기
  };

  return (
    <div className={classes.editorBody} onClick={handleFocus}>
      {currentFile !== null && (
        <ReactPrismEditor
          language="javascript"
          theme="default"
          code={currentFile.contents}
          lineNumber={true}
          changeCode={(code) => {
            onChangeFileContents({
              id: originFile.id,
              contents: code,
            });
          }}
        />
      )}
    </div>
  );
}

export default Editor;
