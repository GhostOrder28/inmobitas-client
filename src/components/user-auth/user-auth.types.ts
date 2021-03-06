export type SignInData = {
  email: string;
  password: string;
}

export type SignUpData = SignInData & {
  names: string;
  contactPhone: number;
  confirmPassword: string;
}

export type UserInfo = {
  email: string;
  names: string;
  userId: number;
}
