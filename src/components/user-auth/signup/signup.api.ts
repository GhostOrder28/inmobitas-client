import { store } from "../../../redux/redux-store";
import { SignUpData } from "../user-auth.types";
import { signUpStart } from "../../../redux/user/user.actions";
import http from "../../../http/http";

const onSubmitSignupData = (signUpData: SignUpData) => {
  store.dispatch(signUpStart(signUpData, http));
};

export {
  onSubmitSignupData
}
