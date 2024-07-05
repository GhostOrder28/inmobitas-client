import { OneOf, Expand } from "../utils/utility-types";

export type AuthenticationError = string;
export type AuthorizationError = string;
export type DuplicateEntityError = string;
export type GuestUserError = string;
export type DbConnectionError = string;
export type LimitReachedError = string;
export type ValidationError = {
  context: { key: string; label: string; };
  message: string;
  path: string[];
  type: string;
}

export type AuthenticationErrorData = {
  authenticationError: AuthenticationError
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
// export type GuestUserErrorData = {
//   guestUserError: GuestUserError;
// }

export type UserErrorData = OneOf<[
  AuthenticationErrorData,
  AuthorizationErrorData,
  DuplicateEntityErrorData,
  LimitReachedErrorData,
  // GuestUserErrorData,
]>

export type ServerErrorData = {
  dbConnectionError: DbConnectionError
}


export type HTTPErrorData = Expand<OneOf<[ValidationErrorData, UserErrorData, ServerErrorData]>>
