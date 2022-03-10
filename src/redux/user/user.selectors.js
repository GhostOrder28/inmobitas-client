import { createSelector } from 'reselect';

export const selectCurrentUser = state => state.user.currentUser;
export const selectErrors = state => state.user.errors;

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.userId
);

export const selectValidationErrorMessage = field => createSelector(
  [selectErrors],
  errors => {
    if (errors) {
      const errorDetails = errors.response.data.details;
      const error = errorDetails && errorDetails.find(errObj => errObj.context.key === field);
      if (error) return error.message;
    } else {
      return null;
    }
  }
)

export const selectAuthErrorMessage = createSelector(
  [selectErrors],
  errors => errors ? errors.response.data.authMessage : null
)
