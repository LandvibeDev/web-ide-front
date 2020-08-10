const SELECTFILE = 'SELECTFILE';
const CLEARFILE = 'CLEARFILE';
const SELECTDIR = 'SELECTDIR';

export const selectFile = (id, name) => ({
  type: SELECTFILE,
  id: id,
  name: name,
});
export const clearFile = (id) => ({ type: CLEARFILE, id: id });
export const selectDirectory = (id) => ({ type: SELECTDIR, id: id });

const initialState = {
  openFiles: [],
  currentFile: { id: null, name: null },
  directoryId: '1',
};
function reducers(state = initialState, action) {
  switch (action.type) {
    case SELECTFILE:
      let newArr = state.openFiles;
      if (
        state.openFiles.filter((file) => file.id === action.id).length === 0
      ) {
        newArr = state.openFiles.concat({ name: action.name, id: action.id });
      }
      return {
        ...state,
        currentFile: { id: action.id, name: action.name },
        openFiles: newArr,
      };
    case CLEARFILE:
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
    case SELECTDIR:
      return {
        ...state,
        directoryId: action.id,
      };
    default:
      return state;
  }
}

export default reducers;
