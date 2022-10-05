import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Button, Pane, TextInput, Heading } from "evergreen-ui";

import { SignInData } from "../user-auth.types";
import http from '../../../utils/axios-instance';
import ErrorMessage from "../../error-message/error-message.component";
import { selectErrorMessage } from "../../../redux/user/user.selectors";
import useWindowDimensions from '../../../hooks/use-window-dimensions';
import { tabletBreakpoint } from '../../../constants/breakpoints.constants';
import GoogleIcon from "../../../icons/social-media-icons/google.icon";
import { signInStart, requestUserInfoForSignInStart } from "../../../redux/user/user.actions";
import { options } from '../../../utils/axios-instance';

const signinWithGoogle = async () => {
  const url = `${options.baseURL}auth/google`;
  window.open(url, "_self");
}

const Signin = () => {
  const emailErrMsg = useSelector(
    selectErrorMessage("validationErrors", "email")
  );

  const passwordErrMsg = useSelector(
    selectErrorMessage("validationErrors", "password")
  );
  const { windowInnerWidth  } = useWindowDimensions();
  const authErrMsg = useSelector(selectErrorMessage("authenticationError"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(['ui']);

  const onSubmit = (userData: SignInData) => {
    dispatch(signInStart(userData, http));
  };

  useEffect(() => {
    dispatch(requestUserInfoForSignInStart(http))
  }, [])

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit, values }) => {
          //console.log("form values: ", values);
          return (
            <form onSubmit={handleSubmit}>
              <Heading size={800}>{ t('signin') }</Heading>
              <div>
                <Field name="email" component="input">
                  {(props) => (
                    <TextInput
                      {...props.input}
                      placeholder={ t('email') }
                      width={"100%"}
                    />
                  )}
                </Field>
                <ErrorMessage fieldErrorMsg={emailErrMsg} />
              </div>
              <div>
                <Field name="password" component="input">
                  {(props) => (
                    <TextInput
                      {...props.input}
                      type="password"
                      placeholder={ t('password') }
                      width={"100%"}
                    />
                  )}
                </Field>
                <ErrorMessage fieldErrorMsg={passwordErrMsg} />
              </div>
              <ErrorMessage fieldErrorMsg={authErrMsg} />
              <Pane display="flex" flexDirection={ windowInnerWidth > tabletBreakpoint ? 'row' : 'column' }>
                <Button width={"100%"} type="submit" appearance="primary">
                  { t('signin') } 
                </Button>
                <Button iconBefore={GoogleIcon} width={'100%'} type='button' appearance="default" onClick={signinWithGoogle}>
                { t('signinWithGoogle') }
                </Button>
                <Button
                  width={"100%"}
                  type="button"
                  onClick={() => navigate("/signup")}
                >
                  { t('signup') } 
                </Button>
              </Pane>
            </form>
          );
        }}
      />
    </div>
  );
};

export default Signin;
