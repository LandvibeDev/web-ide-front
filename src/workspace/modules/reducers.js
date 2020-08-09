const SELECTFILE = 'SELECTFILE';
const CLEARFILE = 'CLEARFILE';

export const selectFile = (name) => ({ type: SELECTFILE, name: name });
export const clearFile = () => ({ type: CLEARFILE });

const initialState = {
  openFiles: [],
  currentFileName: null,
};
function reducers(state = initialState, action) {
  switch (action.type) {
    case SELECTFILE:
      let newArr = state.openFiles;
      if (state.openFiles.filter((file) => file === action.name).length === 0) {
        newArr = state.openFiles.concat(action.name);
      }
      return {
        ...state,
        currentFileName: action.name,
        openFiles: newArr,
      };
    case CLEARFILE:
      return {
        ...state,
        openFiles: null,
      };
    default:
      return state;
  }
}

export default reducers;
