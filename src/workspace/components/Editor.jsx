import React, { useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPrismEditor from 'react-prism-editor';
import { changeFileContents, resetChanged } from '../modules/reducers';
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
  const onResetChanged = (id) => dispatch(resetChanged(id));
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
    return () => {
      editor.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleFocus = () => {
    const node = anchorRef.current.childNodes[0];

    let caretId = '_caret';
    var cc = document.createElement('span');
    cc.appendChild(document.createTextNode(''));
    cc.id = caretId;
    const list = node.childNodes;
    const len = list.length;
    if (len !== 0) {
      if (list[len - 2].tagName === 'SPAN') {
        const add = document
          .querySelector('pre')
          .children[0].insertBefore(cc, list[len - 1]);

        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(add, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        let range = document.createRange();
        let sel = window.getSelection();
        if (list[len - 2] === '#text') range.setStart(list[len - 2], 0);
        else range.setStart(list[len - 2], list[len - 2].length - 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else {
      anchorRef.current.focus();
    }
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

            // 저장할필요없는 상태 (원본 그대로)면 changed =false로 바꿔줌
            if (code === originFile.contents) {
              onResetChanged(originFile.id);
            }
          }}
        />
      )}
    </div>
  );
}

export default Editor;
