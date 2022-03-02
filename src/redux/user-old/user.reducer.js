import userActionTypes from './user.reducer';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  test: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      }
    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case userActionTypes.TEST_REDUX:
      return {
        ...state,
        test: action.payload,
      }
    // case userActionTypes.SIGN_IN_SUCCESS:
    //   return {
    //     ...state,
    //     currentUser: 'success!',
    //     error: null,
    //   }
    // case userActionTypes.SIGN_IN_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }
    default:
      return state;
  }
};

export default userReducer;
