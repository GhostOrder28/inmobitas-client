import { store } from "../../../redux/redux-store";
import { SignInData } from "../user-auth.types";
import { signInStart, generateGuestStart } from "../../../redux/user/user.actions";
import { setIsLoading, unsetIsLoading } from "../../../redux/app/app.actions";
import http from "../../../http/http";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init()

const { t } = i18next;
const { dispatch } = store;

const onSubmitSigninData = async (userData: SignInData) => {
  store.dispatch(signInStart(userData, http));
};

const onSignInAsGuest = () => {
  dispatch(setIsLoading(t("waitForGuest", { ns: "ui" })))
  store.dispatch(generateGuestStart(http))
}

export { 
  onSubmitSigninData,
  onSignInAsGuest
}
