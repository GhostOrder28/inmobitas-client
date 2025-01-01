import * as userActions from "../../../redux/user/user.actions";
import userActionTypes from "../../../redux/user/user.types";
import { AxiosError } from "axios";
import mockAxiosInstance from "../../../../__mocks__/axios";

describe("user actions", () => {

  const signUpData = {
    email: "test@test.com",
    names: "test",
    contactPhone: "321654987",
    password: "mypassword",
    confirmPassword: "mypassword"
  }

  const signInData = {
    email: "test@test.com",
    password: "mypassword",
    userType: "normal" as const,
  }

  const signInResponse = {
    email: "test@test.com",
    userId: 1,
    names: "test",
    oauthId: 923764226352789
  }

  describe("sign up actions", () => {
    it("should return SIGN_UP_START action object", () => {
      const result = userActions.signUpStart(signUpData, mockAxiosInstance);
      expect(result).toStrictEqual({ type: userActionTypes.SIGN_UP_START, payload: signUpData, http: mockAxiosInstance });
    })

    it("should return SIGN_UP_SUCCESS action object", () => {
      const result = userActions.signUpSuccess(signInData, mockAxiosInstance);
      expect(result).toStrictEqual({ type: userActionTypes.SIGN_UP_SUCCESS, payload: signInData, http: mockAxiosInstance });
    })

    // it("should return SIGN_UP_FAILURE action object", () => {
    //   const result = userActions.signUpFailure("error" as any as AxiosError);
    //   expect(result).toStrictEqual({ type: userActionTypes.SIGN_UP_FAILURE, payload: "error" });
    // })
  })

  describe("sign in actions", () => {
    it("should return SIGN_IN_START action object", () => {
      const result = userActions.signInStart(signInData, mockAxiosInstance);
      expect(result).toStrictEqual({ type: userActionTypes.SIGN_IN_START, payload: signInData, http: mockAxiosInstance });
    })

    it("should return SIGN_IN_SUCCESS action object", () => {
      const result = userActions.signInSuccess(signInResponse);
      expect(result).toStrictEqual({ type: userActionTypes.SIGN_IN_SUCCESS, payload: signInResponse });
    })

    it("should return SIGN_IN_FAILURE action object", () => {
      const result = userActions.signInFailure("error" as any as AxiosError);
      expect(result).toStrictEqual({ type: userActionTypes.SIGN_IN_FAILURE, payload: "error" });
    })
  })

  describe("sign in actions", () => {
    it("should return SIGN_OUT_START action object", () => {
      const result = userActions.signOutStart(mockAxiosInstance);
      expect(result).toStrictEqual({ type: userActionTypes.SIGN_OUT_START, payload: undefined });
    })

    it("should return SIGN_OUT_SUCCESS action object", () => {
      const result = userActions.signOutSuccess();
      expect(result).toStrictEqual({ type: userActionTypes.SIGN_OUT_SUCCESS, payload: undefined });
    })
  })

  describe("other user actions", () => {
    it("should return CLEAR_ERRORS action object", () => {
      const result = userActions.clearErrors();
      expect(result).toStrictEqual({ type: userActionTypes.CLEAR_ERRORS, payload: undefined })
    })
  })

})
