const SET_FIND_VALUE = 'SET_FIND_VALUE';
const SET_REPLACE_VALUE = 'SET_REPLACE_VALUE';

export const setFindValue = (value) => ({ type: SET_FIND_VALUE, value: value });
export const setReplaceValue = (value) => ({
  type: SET_REPLACE_VALUE,
  value: value,
});

const initalState = {
  find: '',
  replace: '',
};

function finder(state = initalState, action) {
  switch (action.type) {
    case SET_FIND_VALUE:
      return {
        ...state,
        find: action.value,
      };
    case SET_REPLACE_VALUE:
      return state;
    default:
      return state;
  }
}

export default finder;
