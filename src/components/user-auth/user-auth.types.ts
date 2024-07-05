export type SignInData = {
  email: string;
  password: string;
  userType?: 'normal' | 'guest';
}

export type SignUpData = Omit<SignInData, 'userType'> & {
  names: string;
  email: string;
  contactPhone: string;
  password: string;
  confirmPassword: string;
}

export type UserInfo = {
  names: string;
  userId: number;
  oauthId: number | string;
}
