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
  counts: 0, // find한 전체 개수
  index: null, // find된 목록 중 현재 위치
};

function finder(state = initalState, action) {
  switch (action.type) {
    case SET_FIND_VALUE:
      return {
        ...state,
        find: action.value,
      };
    case SET_REPLACE_VALUE:
      return {
        ...state,
        replace: action.value,
      };
    default:
      return state;
  }
}

export default finder;
