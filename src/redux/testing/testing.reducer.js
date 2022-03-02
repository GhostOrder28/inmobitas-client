import testingActionTypes from './testing.types';

const INITIAL_STATE = {
  testing: null
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case testingActionTypes.ON_TEST:
      return {
        ...state,
        testing: action.payload
      }
    default:
      return state;
  }
}

export default testReducer;
