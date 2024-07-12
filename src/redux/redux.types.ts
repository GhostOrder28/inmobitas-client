import { 
  InvalidIdentifierErrorData,
  DuplicateEntityErrorData,
  ValidationErrorData,
  DbConnectionErrorData
} from "../http/http.types";
import { Expand } from "../utils/utility-types";

export type RequestUserInfoFailureError = InvalidIdentifierErrorData | DbConnectionErrorData; // this is not redundant bc there can be other error types when requesting user info
export type SignUpFailureError =  ValidationErrorData | DuplicateEntityErrorData | DbConnectionErrorData;
export type SignInFailureError = Expand<ValidationErrorData | InvalidIdentifierErrorData | DbConnectionErrorData>;
export type GenerateGuestUserError = SignInFailureError | DbConnectionErrorData;
