import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { UserState } from "./user.reducer";
import { ValidationError, HTTPErrors } from "../../http/http.types";
import { AxiosError } from "axios";
import { ClientErrors } from "../../errors/errors.types";
import axios from "axios";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userReducer) => userReducer.currentUser
);

export const selectGuestPending = createSelector(
  [selectUserReducer],
  (userReducer) => userReducer.guestPending
);

export const selectErrorObj = createSelector(
  [selectUserReducer],
  (userReducer) => userReducer.errors
);

export const selectUserSignedOut = createSelector(
  [selectUserReducer],
  (userReducer) => userReducer.userSignedOut
);

function isAxiosError(err: UserState["errors"]): err is AxiosError {
  return (err as AxiosError).response !== undefined;
}

function isValidationError(err: string | ValidationError[]): err is ValidationError[] {
  return (err as ValidationError[]).find !== undefined;
}

export const selectClientError = () =>
  createSelector([selectErrorObj], (errorObj) => {
    if (errorObj === null) return;
    if (axios.isAxiosError(errorObj)) return;
    const data = errorObj.message;

    return data;
  })

export const selectServerError = (errorType: HTTPErrors) =>
  createSelector([selectErrorObj], (errorObj) => {
    if (errorObj === null) return;
    if (!isAxiosError(errorObj)) return;

    const data = errorObj?.response?.data?.[errorType];

    return data;
  })

export const selectValidationError = (field: string) =>
  createSelector([selectErrorObj], (errorObj) => {
    if (errorObj === null) return;
    if (!isAxiosError(errorObj)) return;

    const validationErrors = errorObj?.response?.data?.validationErrors;

    if (validationErrors) {
      const error = validationErrors.find(
        (err) => err.context.key === field
      );
      return error?.message;
    };
  })

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.userId
);

export const selectCurrentUserOAuthId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.oauthId
);

