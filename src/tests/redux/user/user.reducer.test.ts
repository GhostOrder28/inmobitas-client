import { 
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  clearErrors,
} from "../../../redux/user/user.actions";
import axios, { AxiosError } from "axios";
import userReducer from "../../../redux/user/user.reducer";
import { UserState } from "../../../redux/user/user.reducer";


describe("user reducer", () => {

  const initialState: UserState = {
    currentUser: null,
    errors: null,
    userSignedOut: false,
  };

  it("should handle undefined args", () => {
    expect(userReducer(undefined, undefined)).toEqual(initialState);
  })

  // it("should handle SIGN_UP_FAILURE", () => {
  //   expect(userReducer(initialState, signUpFailure("error" as any as AxiosError))).toEqual({
  //     currentUser: null,
  //     errors: "error"
  //   })
  // })

  it("should handle SIGN_IN_FAILURE", () => {
    expect(userReducer(initialState, signInFailure("error" as any as AxiosError))).toEqual({
      currentUser: null,
      errors: "error"
    })
  })

  it("should handle SIGN_OUT_FAILURE", () => {
    expect(userReducer(initialState, signOutFailure("error" as any as AxiosError))).toEqual({
      currentUser: null,
      errors: "error"
    })
  })

  it("should handle SIGN_IN_SUCCESS", () => {
    expect(userReducer(initialState, signInSuccess({
      names: "test",
      userId: 2,
      oauthId: 4654313484
    }))).toEqual({
      currentUser: {
        email: "test@test.com",
        names: "test",
        userId: 2
      },
      errors: null
    })
  })

  it("should handle SIGN_OUT_SUCCESS", () => {
    expect(userReducer(initialState, signOutSuccess())).toEqual({
      currentUser: null,
      errors: null
    })
  })

  it("should handle CLEAR_ERRORS", () => {
    expect(userReducer(initialState, clearErrors())).toEqual({
      currentUser: null,
      errors: null
    })
  })
  
})

