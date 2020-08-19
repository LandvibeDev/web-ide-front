const SELECT_FILE = 'SELECT_FILE';
const CLEAR_FILE = 'CLEAR_FILE';
const SELECT_DIR = 'SELECT_DIR';
const CHANGE_FILE_CONTENTS = 'CHANGE_FILE_CONTENTS';
const SET_SELECTED_ID = 'SET_SELECTED_ID';

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
export const setSelectedId = (id) => ({ type: SET_SELECTED_ID, id: id });

const initialState = {
  openFiles: [],
  currentFile: { id: null, name: null },
  directoryId: '1',
  selectedId: 1,
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
        });
      }
      return {
        ...state,
        currentFile: { id: action.id, name: action.name },
        openFiles: newArr,
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
        };
      } else {
        // 현재 보고있는 파일을 닫은경우
        if (state.currentFile.id === action.id) {
          const newCurrentFile = newOpenFiles[newOpenFiles.length - 1];
          return {
            ...state,
            currentFile: { id: newCurrentFile.id, name: newCurrentFile.name },
            openFiles: newOpenFiles,
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
          };
        }
      }
    case SELECT_DIR:
      return {
        ...state,
        directoryId: action.id,
      };

    case CHANGE_FILE_CONTENTS:
      const changeOpenFiles = state.openFiles;
      const idx = changeOpenFiles.findIndex((file) => file.id === action.id);
      if (changeOpenFiles[idx].contents !== action.contents) {
        changeOpenFiles[idx].contents = action.contents;
      }
      return {
        ...state,
        openFiles: changeOpenFiles,
      };
    case SET_SELECTED_ID:
      return {
        ...state,
        selectedId: action.id,
      };
    default:
      return state;
  }
}

export default reducers;
