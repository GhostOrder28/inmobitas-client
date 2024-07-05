import { store } from "../../../redux/redux-store";
import { SignInData } from "../user-auth.types";
import { signInStart, generateGuestStart } from "../../../redux/user/user.actions";
import http from "../../../http/http";

const onSubmitSigninData = async (userData: SignInData) => {
  console.log('userData: ', userData);
  store.dispatch(signInStart(userData, http));
};

const onSignInAsGuest = () => {
  store.dispatch(generateGuestStart(http))
}

export { 
  onSubmitSigninData,
  onSignInAsGuest
}
