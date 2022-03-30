import userActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  errors: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case userActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errors: null,
      }
    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errors: null,
      }
    case userActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        errors: null,
      }
    case userActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case userActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      }
    default:
      return state;
  }
}

export default userReducer;
