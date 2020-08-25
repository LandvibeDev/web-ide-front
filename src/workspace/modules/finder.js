const SET_FIND_VALUE = 'SET_FIND_VALUE';
const SET_REPLACE_VALUE = 'SET_REPLACE_VALUE';
const SET_FINDLIST = 'SET_FINDLIST';
const SET_INDEX = 'SET_INDEX';
const SET_RANGE = 'SET_RANGE';
export const setFindValue = (value) => ({ type: SET_FIND_VALUE, value: value });
export const setReplaceValue = (value) => ({
  type: SET_REPLACE_VALUE,
  value: value,
});

export const setFindList = (list) => ({ type: SET_FINDLIST, findList: list });
export const setIndex = (index) => ({ type: SET_INDEX, index: index });
export const setRange = (range) => ({ type: SET_RANGE, range: range });

const initalState = {
  find: '',
  replace: '',
  findList: [], // find한 목록
  index: null, // find된 목록 중 현재 위치
  range: null,
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
    case SET_FINDLIST:
      return {
        ...state,
        findList: action.findList,
      };

    case SET_INDEX:
      return {
        ...state,
        index: action.index,
      };
    case SET_RANGE:
      return {
        ...state,
        range: action.range,
      };
    default:
      return state;
  }
}

export default finder;
