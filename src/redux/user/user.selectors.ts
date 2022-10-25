import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { UserState } from "./user.reducer";
import { UserError } from "./user.types";
import { ValidationError } from "../redux.types";
import { AxiosError } from "axios";

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

export const selectErrorMessage = (errorType: UserError, field?: string) =>
  createSelector([selectErrorObj], (errorObj) => {
    if (errorObj === null) return;

    function isAxiosError(err: typeof errorObj): err is AxiosError {
      return (err as AxiosError).response !== undefined;
    }

    if (isAxiosError(errorObj)) {
      const data = errorObj?.response?.data;
      const errorData = data?.[errorType];

      function isValidationError(err: string | ValidationError[]): err is ValidationError[] {
        return (err as ValidationError[]).find !== undefined;
      }

      if (errorData) {
        if (isValidationError(errorData)) {
          const validationError = errorData.find(
            (err) => err.context.key === field
          );
          return validationError?.message;
        }
        return errorData;
      }
    }
  });

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.userId
);

export const selectCurrentUserOAuthId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.oauthId
);

