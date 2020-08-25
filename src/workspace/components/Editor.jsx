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

  const handleFocus = (e) => {
    // 코드 영역 클릭하면 영역한부분 focus
    if (['PRE', 'CODE', 'SPAN'].includes(e.target.tagName)) {
      e.preventDefault();
      return;
    }
    // 에디터 빈 영역 클릭하면 코드 맨 마지막 오른쪽부분으로 focusing
    // 1. 빈 파일 -> 첫번째 라인 focus
    // 2. 이미 코드 존재 -> 맨 마지막줄 다음에 새로운 span 노드 생성해서 거기에 range, selection으로 포커스 달아줌
    // 3. 맨 마지막줄이 span이 아니고 #text이거나 " " 일 경우에는 span 추가하지 않고 그 위치에 focus
    const codeList = anchorRef.current.childNodes[0].childNodes;
    const len = codeList.length;
    if (len !== 0) {
      // 빈 파일이 아닐 때
      let range = document.createRange();
      let sel = window.getSelection();

      if (codeList[len - 2].tagName === 'SPAN') {
        // 새로운 span 만들어 추가
        var newSpan = document.createElement('span');
        newSpan.appendChild(document.createTextNode(''));
        document
          .querySelector('pre')
          .children[0].insertBefore(newSpan, codeList[len - 1]);
        range.setStart(newSpan, 0); // 새로 추가한 span부분에 range 시작점 set
      } else {
        // 마지막부분(추가할 부분)이 #text이거나 "..."인 경우가 있어서 구분해서 range 시작점 정해줌
        if (codeList[len - 2] === '#text') range.setStart(codeList[len - 2], 0);
        else range.setStart(codeList[len - 2], codeList[len - 2].length - 1);
      }
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
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
