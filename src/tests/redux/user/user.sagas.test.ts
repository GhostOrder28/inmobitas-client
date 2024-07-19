import * as userSagas from "../../../redux/user/user.sagas";
import * as userActions from "../../../redux/user/user.actions";
import userActionTypes from "../../../redux/user/user.types";
import { takeLatest, put, call } from "typed-redux-saga/macro";
import { createPostRequest } from "../../../redux/redux-utils/create-request";
import mockAxiosInstance from "axios";
import { AxiosError } from "axios";


describe("Saga watchers", () => {
  it("should handle SIGN_IN_START", () => {
    const gen = userSagas.onSignInStart();
    expect(gen.next().value)
      .toEqual(takeLatest(userActionTypes.SIGN_IN_START, userSagas.signIn));
    expect(gen.next().done)
      .toEqual(true);
  })

  it("should handle SIGN_UP_START", () => {
    const gen = userSagas.onSignUpStart();
    expect(gen.next().value)
      .toEqual(takeLatest(userActionTypes.SIGN_UP_START, userSagas.signUp));
    expect(gen.next().done)
      .toEqual(true);
  })

  it("should handle SIGN_OUT_START", () => {
    const gen = userSagas.onSignOutStart();
    expect(gen.next().value)
      .toEqual(takeLatest(userActionTypes.SIGN_OUT_START, userSagas.signOut));
    expect(gen.next().done)
      .toEqual(true);
  })

  it("should handle SIGN_UP_SUCCESS", () => {
    const gen = userSagas.onSignUpSuccess();
    expect(gen.next().value).toEqual(takeLatest(userActionTypes.SIGN_UP_SUCCESS, userSagas.signInAfterSignUp))
  })
})

describe("Sagas", () => {
  const apiCall = createPostRequest(mockAxiosInstance);

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
    userType: "normal" as const
  }

  const signUpResponseMock = { 
    data: signInData
  }

  const signInResponseMock = {
    data: {
      email: "test@test.com",
      userId: 1,
      names: "test",
      oauthId: "13546343545"
    }
  }

  describe("signUp", () => {
    let gen: ReturnType<typeof userSagas.signUp>; 

    beforeEach(() => {
      gen = userSagas.signUp({ type: userActionTypes.SIGN_UP_START, payload: signUpData, http: mockAxiosInstance });
    })

    it("should call api with signup data", async () => {
      expect(JSON.stringify(gen.next().value))
        .toEqual(JSON.stringify(call(apiCall, "/signup", signUpData)));
    })

    // it("should dispatch SIGN_UP_SUCCESS", () => {
    //   gen.next();
    //   expect(gen.next(signUpResponseMock).value)
    //     .toEqual(put(userActions.signUpSuccess(signUpResponseMock.data, mockAxiosInstance)))
    // })

    it("should dispatch SIGN_UP_FAILURE", () => {
      gen.next();
      expect(gen.throw({ response: "We couldn't register the user, reason: XYZ" }).value)
        .toEqual(put(userActions.signUpFailure({ response: "We couldn't register the user, reason: XYZ" } as any as AxiosError)))
    })

  })

  describe("signIn", () => {
    let gen: ReturnType<typeof userSagas.signIn>; 

    beforeEach(() => {
      gen = userSagas.signIn({ type: userActionTypes.SIGN_IN_START, payload: signInData, http: mockAxiosInstance });
    })

    it("should call api with signin data", async () => {
      expect(JSON.stringify(gen.next().value))
        .toEqual(JSON.stringify(call(apiCall, "/signin", signInData)));
    })

    // it("should dispatch SIGN_IN_SUCCESS", () => {
    //   gen.next();
    //   expect(gen.next(signInResponseMock).value)
    //     .toEqual(put(userActions.signInSuccess(signInResponseMock.data)))
    // })

    it("should dispatch SIGN_IN_FAILURE", () => {
      gen.next();
      expect(gen.throw({ response: "We couldn't sign in the user, reason: XYZ" }).value)
        .toEqual(put(userActions.signInFailure({ response: "We couldn't sign in the user, reason: XYZ" } as any as AxiosError)))
    })
  })

  describe("signOut", () => {
    it("should dispatch SIGN_OUT_SUCCESS", () => {
      const gen = userSagas.signOut({ type: userActionTypes.SIGN_OUT_START, http: mockAxiosInstance });
      expect(gen.next().value)
        .toEqual(put(userActions.signOutSuccess()));
      expect(gen.next().done)
        .toEqual(true);
    })
  })

})

