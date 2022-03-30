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
    const error = errors && errors.response.data.validationErrors ?
      errors.response.data.validationErrors.find(err => err.context.key === field) :
      null;
    if (error) return error.message
  }
)

export const selectAuthErrorMessage = createSelector(
  [selectErrors],
  errors => errors && errors.response.data.authErrors
)

export const duplicateEntityError = createSelector(
  [selectErrors],
  errors => {
    return errors && errors.response.data.duplicateEntityError
  }
)
