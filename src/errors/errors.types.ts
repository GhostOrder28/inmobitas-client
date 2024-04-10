import { AuthenticationError } from './auth.errors'

export type ClientErrorTypes = 
  | AuthenticationError
  | Error;

export type ClientError = {
  clientError: ClientErrorTypes;
}
