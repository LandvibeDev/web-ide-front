import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPrismEditor from 'react-prism-editor';

import './font.css';

const useStyles = makeStyles((theme) => ({
  editorBody: {
    height: '100%',
    overflow: 'scroll',
    background: '#f5f2f0',
  },
}));

function Editor({ file }) {
  const classes = useStyles();
  const [content, setContent] = useState(String(file.contents));

  const saveContent = () => {
    const data = document.querySelector('pre').innerText;
    console.log(data);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey || event.metaKey) {
      switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
          event.preventDefault();
          saveContent();
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
      {file !== null && (
        <ReactPrismEditor
          language="javascript"
          theme="default"
          code={content}
          lineNumber={true}
        />
      )}
    </div>
  );
}

export default Editor;
