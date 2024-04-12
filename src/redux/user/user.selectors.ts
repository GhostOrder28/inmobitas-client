import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { UserState } from "./user.reducer";
import { UserError } from "./user.types";
import { ValidationError } from "../redux.types";
import { AxiosError } from "axios";
import { ClientError } from "../../errors/errors.types";

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

function isAxiosError(err: UserState['errors']): err is AxiosError {
  return (err as AxiosError).response !== undefined;
}

function isClientError(err: UserState['errors']): err is ClientError {
  return (err as ClientError).clientError !== undefined;
}

function isValidationError(err: string | ValidationError[]): err is ValidationError[] {
  return (err as ValidationError[]).find !== undefined;
}

export const selectErrorMessage = (errorType: UserError, field?: string) =>
  createSelector([selectErrorObj], (errorObj) => {
    if (errorObj === null) return;

    if (errorType === 'clientError') {
      if (!isClientError(errorObj)) return;
      if (!errorObj.clientError) return;
      return errorObj.clientError.message 
    } else {
      if (!isAxiosError(errorObj)) return;
      const data = errorObj?.response?.data;
      const errorData = data?.[errorType];

      if (errorData) {
        if (isValidationError(errorData)) {
          const validationError = errorData.find(
            (err) => err.context.key === field
          );
          return validationError?.message;
        }
        return errorData;
      }
    };

  });

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.userId
);

export const selectCurrentUserOAuthId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.oauthId
);

