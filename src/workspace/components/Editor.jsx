import React, { useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPrismEditor from 'react-prism-editor';
import { changeFileContents, resetChanged } from '../modules/reducers';
import { setRange } from '../modules/finder';
import { useDispatch, useSelector } from 'react-redux';
import './font.css';

const useStyles = makeStyles((theme) => ({
  editorBody: {
    height: '100%',
    overflow: 'scroll',
    background: '#f5f2f0',
  },
}));

function Editor({ originFile, currentFile, saveFile, currentContents }) {
  const classes = useStyles();
  const anchorRef = useRef();

  const findValue = useSelector((state) => state.finder.find);
  // const findList = useSelector((state) => state.finder.findList);
  const index = useSelector((state) => state.finder.index);

  const dispatch = useDispatch();
  const onChangeFileContents = (file) => dispatch(changeFileContents(file));
  const onResetChanged = (id) => dispatch(resetChanged(id));
  const onSetRange = useCallback((range) => dispatch(setRange(range)), [
    dispatch,
  ]);

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

  useEffect(() => {
    if (anchorRef.current.childNodes.length !== 0) {
      //   // ReactPrismEditor 로드 되고 나서부터 실행
      let count = -1; // findList의 index와 맞는 순서 찾기 위함
      let findIndex = -1; // 찾은 결과 가져옴
      const codeList = anchorRef.current.childNodes[0].childNodes; // 코드 값 리스트
      for (let i = 0; i < codeList.length; i++) {
        // span인 경우와 그냥 text인경우 분리
        if (codeList[i].tagName === 'SPAN') {
          if (codeList[i].innerText.match(findValue) !== null) count++;
        } else {
          if (codeList[i].textContent.match(findValue) !== null) count++;
        }
        // 해당 index에 해당하는 노드 추출
        if (count === index) {
          findIndex = i;
          break;
        }
      }
      if (codeList[findIndex] !== undefined) {
        //   // range, selection 생성
        //   //range.setStart(기준 노드의 "텍스트노드"(childNodes[0]으로 가져왔음) , 기준노드에서 몇 caret뒤에서 시작할지?)
        let editRange = document.createRange();
        if (codeList[findIndex].tagName === 'SPAN') {
          // findValue가 다 지워졌을때 null로 인식돼서 오류나는 경우가 있어 처리
          if (codeList[findIndex].innerText.match(findValue) === null) return;
          editRange.setStart(
            codeList[findIndex].childNodes[0],
            codeList[findIndex].innerText.match(findValue).index,
          );
        } else {
          editRange.setStart(
            codeList[findIndex],
            codeList[findIndex].textContent.match(findValue).index,
          );
        }
        onSetRange(editRange); // redux로 range 저장해서 edit 찾기 창에서 엔터누르거나 검색 하면 selection변하게ㅣ..
      } else {
        // TODO 노드가 하나가 아닐땐 findIndex를 못찾아서 다른 방법 찾아야함
        console.log(findIndex);
        console.log(findValue);
      }

      // TODO findValue에 맞는 만큼 css처리 해주려고했는데 잘 안되는중 . .
      // 현재 선택 노드 이상 넘어가면 next sibling 노드로 범위 다시 잡아줘야함. 아니면 range.startContainer안에서 범위 선택 가능
      // TODO 마지막 노드 선택일때나 빈 코드일때 예외처리해줘야함
      // if (findValue.length + 1 > editRange.startContainer.length) {
      //   // TODO 띄어쓰기 있으면 그거도 생각해줘야함
      //   if (codeList[findIndex + 1].tagName === 'SPAN') {
      //     editRange.setEnd(
      //       codeList[findIndex + 1].childNodes[0],
      //       findValue.length + 1 - editRange.startContainer.length,
      //     );
      //   } else {
      //     editRange.setEnd(
      //       codeList[findIndex + 1],
      //       findValue.length + 1 - editRange.startContainer.length,
      //     );
      //   }
      // } else {
      //   //span일땐 +1 안해야함
      //   if (codeList[findIndex].tagName === 'SPAN') {
      //     editRange.setEnd(editRange.startContainer, findValue.length);
      //   } else
      //     editRange.setEnd(editRange.startContainer, findValue.length + 1);
      // }
    }
  }, [currentContents, findValue, index, onSetRange]);

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
