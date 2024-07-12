import { OneOf, Expand } from "../utils/utility-types";

export type InvalidIdentifierError = string;
export type AuthorizationError = string;
export type DuplicateEntityError = string;
export type GuestUserError = string;
export type DbConnectionError = string;
export type LimitReachedError = string;
export type UserSessionExpiredError = string;
export type ValidationError = {
  context: { key: string; label: string; };
  message: string;
  path: string[];
  type: string;
}
export type UnverifiedUserErrorData = {
  unverifiedUserError: {
    errorMessage: string;
    errorMessageDescription: string;
  }
}

export type InvalidIdentifierErrorData = {
  authenticationError: InvalidIdentifierError
}
export type AuthorizationErrorData = {
  authorizationError: AuthorizationError
}
export type DuplicateEntityErrorData = {
  duplicateEntityError: DuplicateEntityError
}
export type DbConnectionErrorData = {
  dbConnectionError: DbConnectionError
}
export type LimitReachedErrorData = {
  limitReachedError: LimitReachedError
}
export type ValidationErrorData = {
  validationErrors: ValidationError[]
}
export type UserSessionExpiredErrorData = {
  userSessionExpiredError: UserSessionExpiredError
}
// export type GuestUserErrorData = {
//   guestUserError: GuestUserError;
// }

export type UserErrorData = OneOf<[
  InvalidIdentifierErrorData,
  AuthorizationErrorData,
  DuplicateEntityErrorData,
  LimitReachedErrorData
  // GuestUserErrorData,
]>

export type HTTPErrorData = Expand<OneOf<[
  ValidationErrorData, 
  UserErrorData, 
  DbConnectionErrorData,
  UnverifiedUserErrorData, 
  UserSessionExpiredErrorData,
]>>

export type HTTPErrors = Exclude<keyof HTTPErrorData, 'validationErrors' | 'unverifiedUserError'>;
