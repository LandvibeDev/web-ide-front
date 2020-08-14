import React, { useState } from 'react';
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

  return (
    <div className={classes.editorBody}>
      {file !== null && (
        <ReactPrismEditor
          language="javascript"
          theme="default"
          code={content}
          lineNumber={true}
          changeCode={(code) => {
            setContent(code);
          }}
        />
      )}
    </div>
  );
}

export default Editor;
