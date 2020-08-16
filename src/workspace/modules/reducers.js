const SELECT_FILE = 'SELECT_FILE';
const CLEAR_FILE = 'CLEAR_FILE';
const SELECT_DIR = 'SELECT_DIR';

export const selectFile = (file) => ({
  type: SELECT_FILE,
  id: file.id,
  name: file.name,
  contents: file.contents,
});
export const clearFile = (id) => ({ type: CLEAR_FILE, id: id });
export const selectDirectory = (id) => ({ type: SELECT_DIR, id: id });

const initialState = {
  openFiles: [],
  currentFile: { id: null, name: null },
  directoryId: '1',
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
          };
        }
      }
    case SELECT_DIR:
      return {
        ...state,
        directoryId: action.id,
      };
    default:
      return state;
  }
}

export default reducers;
