const SELECT_FILE = 'SELECT_FILE'; // 파일 선택
const CLEAR_FILE = 'CLEAR_FILE'; // openfiletab에서 삭제 & 파일 삭제
const SELECT_DIR = 'SELECT_DIR'; // 폴더 선택
const CHANGE_FILE_CONTENTS = 'CHANGE_FILE_CONTENTS'; // 에디터 파일 내용 변경
const CHANGE_FILE_NAME = 'CHANGE_FILE_NAME'; // rename
const SET_SELECTED_ID = 'SET_SELECTED_ID'; // 파일트리에서 파일,폴더 선택시 selected 값 설정
const RESET_CHANGED = 'RESET_CHANGED'; // 파일 저장시 changed false로 다시 변경

export const selectFile = (file) => ({
  type: SELECT_FILE,
  id: file.id,
  name: file.name,
  contents: file.contents,
});
export const clearFile = (id) => ({ type: CLEAR_FILE, id: id });
export const selectDirectory = (id) => ({
  type: SELECT_DIR,
  id: id,
});
export const changeFileContents = (file) => ({
  type: CHANGE_FILE_CONTENTS,
  id: file.id,
  contents: file.contents,
});
export const changeFileName = (id, fileName) => ({
  type: CHANGE_FILE_NAME,
  id: id,
  name: fileName,
});
export const setSelectedId = (id) => ({ type: SET_SELECTED_ID, id: id });
export const resetChanged = (id) => ({ type: RESET_CHANGED, id: id });

const initialState = {
  openFiles: [],
  currentFile: { id: null, name: null },
  directoryId: '1',
  selectedId: 1,
  currentContents: '',
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case SELECT_FILE:
      let newArr = state.openFiles;
      if (
        state.openFiles.filter((file) => file.id === action.id).length === 0
      ) {
        newArr = state.openFiles.concat({
          name: action.name,
          id: action.id,
          contents: action.contents,
          changed: false,
        });
      }
      return {
        ...state,
        currentFile: { id: action.id, name: action.name },
        openFiles: newArr,
        currentContents: action.contents,
      };
    case CLEAR_FILE:
      const newOpenFiles = state.openFiles.filter(
        (file) => file.id !== action.id,
      );

      // 아무 파일도 열려있지 않을 때는 Project로 포커스 이동
      if (newOpenFiles.length === 0) {
        return {
          ...state,
          currentFile: { id: null, name: null },
          openFiles: newOpenFiles,
          directoryId: '1',
          selectedId: 1,
          currentContents: '',
        };
      } else {
        // 현재 보고있는 파일을 닫은경우
        if (state.currentFile.id === action.id) {
          const newCurrentFile = newOpenFiles[newOpenFiles.length - 1];
          return {
            ...state,
            currentFile: { id: newCurrentFile.id, name: newCurrentFile.name },
            openFiles: newOpenFiles,
            selectedId: newCurrentFile.id,
            currentContents: newOpenFiles.filter(
              (file) => file.id === newCurrentFile.id,
            )[0].contents,
          };
        } else {
          return {
            ...state,
            openFiles: newOpenFiles,
            currentFile: {
              id: state.currentFile.id,
              name: state.currentFile.name,
            },
            selectedId: state.currentFile.id,
            currentContents: newOpenFiles.filter(
              (file) => file.id === state.currentFile.id,
            )[0].contents,
          };
        }
      }
    case SELECT_DIR:
      return {
        ...state,
        directoryId: action.id,
      };

    // file contents변경
    case CHANGE_FILE_CONTENTS:
      const changeOpenFiles = state.openFiles;
      const idx = changeOpenFiles.findIndex((file) => file.id === action.id);
      if (changeOpenFiles[idx].contents !== action.contents) {
        changeOpenFiles[idx].contents = action.contents;
        changeOpenFiles[idx].changed = true;
      }
      return {
        ...state,
        openFiles: changeOpenFiles,
        currentContents: action.contents,
      };
    // rename으로 filename 변경
    case CHANGE_FILE_NAME:
      const changedNameOpenFiles = state.openFiles;
      const nidx = changedNameOpenFiles.findIndex(
        (file) => file.id === action.id,
      );
      if (changedNameOpenFiles[nidx].name !== action.name) {
        changedNameOpenFiles[nidx].name = action.name;
      }
      return {
        ...state,
        openFiles: changedNameOpenFiles,
      };
    case SET_SELECTED_ID:
      return {
        ...state,
        selectedId: action.id,
      };
    case RESET_CHANGED:
      const setChangedOpenFiles = state.openFiles;
      const cidx = setChangedOpenFiles.findIndex(
        (file) => file.id === action.id,
      );
      setChangedOpenFiles[cidx].changed = false;
      return {
        ...state,
        openFiles: setChangedOpenFiles,
      };
    default:
      return state;
  }
}

export default reducers;
