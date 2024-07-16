import { 
  InvalidIdentifierErrorData,
  DuplicateEntityErrorData,
  ValidationErrorData,
  ServerErrorData,
} from "../http/http.types";
import { Expand } from "../utils/utility-types";

export type RequestUserInfoFailureError = InvalidIdentifierErrorData | ServerErrorData; // this is not redundant bc there can be other error types when requesting user info
export type SignUpFailureError =  ValidationErrorData | DuplicateEntityErrorData | ServerErrorData;
export type SignInFailureError = Expand<ValidationErrorData | InvalidIdentifierErrorData | ServerErrorData>;
export type GenerateGuestUserError = SignInFailureError | ServerErrorData;
