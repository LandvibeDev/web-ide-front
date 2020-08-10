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
      // TODO : 오류있어서 수정중
      // const newOpenFiles = state.openFiles.filter(
      //   (file) => file.id !== action.id,
      // );

      // const newCurrentFile =
      //   newOpenFiles.length !== 0
      //     ? newOpenFiles[newOpenFiles.length - 1]
      //     : { id: null, name: null };
      return {
        ...state,
        // currentFile: { id: newCurrentFile.id, name: newCurrentFile.name },
        // openFiles: newOpenFiles,
      };
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
