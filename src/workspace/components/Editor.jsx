import React, { useState, useEffect, useCallback } from 'react';
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
  const [originContents] = useState(String(originFile.contents));
  const dispatch = useDispatch();
  const onChangeFileContents = (file) => dispatch(changeFileContents(file));

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey || event.metaKey) {
      switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
          event.preventDefault();
          const data = document.querySelector('pre').innerText;
          saveFile(currentFile.id, data);
          break;
        default:
          break;
      }
    } else return;
  }, []);

  useEffect(() => {
    const editor = document.querySelector('pre');
    editor.addEventListener('keydown', handleKeyDown);
    return () => {
      editor.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={classes.editorBody}>
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
