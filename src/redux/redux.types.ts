export type ValidationError = {
  context: { key: string; label: string; };
  message: string;
  path: string[];
  type: string;
}

export type GenerateGuestError = {
  guestUserError: string;
}

export type SignUpFailureError = 
  | { validationErrors: ValidationError[]; }
  | { duplicateEntityError: string; };

export type SignInFailureError = 
  | { validationErrors: ValidationError[]; } 
  | { authenticationError: string; };

export type RequestUserInfoFailureError = {
  authenticationError: string; 
};

