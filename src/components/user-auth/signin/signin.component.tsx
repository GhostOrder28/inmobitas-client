import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Text,
  Button, 
  Pane, 
  TextInput, 
  Heading, 
  minorScale, 
  Card
} from "evergreen-ui";

import { SignInData } from "../user-auth.types";
import http from '../../../utils/axios-instance';
import axios from 'axios';
import { options } from '../../../utils/axios-instance';
import ErrorMessage from "../../error-message/error-message.component";
import { selectErrorMessage } from "../../../redux/user/user.selectors";
import useWindowDimensions from '../../../hooks/use-window-dimensions';
import GoogleIcon from "../../../icons/social-media-icons/google.icon";
import { TABLET_BREAKPOINT_VALUE } from '../../../constants/breakpoints.constants';
import { signInStart, requestUserInfoForSignInStart, generateGuestStart } from "../../../redux/user/user.actions";

import './signin.styles.css';

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
  const rateLimitErrMsg = useSelector(selectErrorMessage("limitReachedError"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(['ui']);

  const onSubmit = async (userData: SignInData) => {
    dispatch(signInStart(userData, http));
  };

  const generateGuest = () => {
    dispatch(generateGuestStart(http))
  }

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
            <>
              <Heading size={800}>{ t('signin') }</Heading>
              <Pane display={'flex'} flexDirection={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? 'row' : 'column' }>
                <Pane flex={1}>
                  <form onSubmit={handleSubmit}>
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
                    <Pane display="flex" flexDirection={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? 'row' : 'column' }>
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
                </Pane>
                <Card
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flex={1}
                  width={'100%'}
                  marginLeft={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? minorScale(10) : null }
                  marginTop={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? null : minorScale(10) }
                  paddingY={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? null : minorScale(6) }
                  elevation={1}
                  className={'guest-button'}
                >
                  <Button 
                    type='button'
                    onClick={generateGuest}
                    width={'70%'}
                    marginX={minorScale(15)}
                    appearance={'primary'}
                    intent={'success'}
                    size={'medium'}
                  >
                    { t('signinAsGuest') }
                  </Button>
                  <Text 
                    width={'80%'}
                    marginX={minorScale(15)}
                    marginTop={minorScale(3)}
                    textAlign={'center'}
                    size={'300'}
                    color={'#696f8c'}
                  >
                    { t('signinAsGuestMessage') }
                  </Text>
                  <ErrorMessage fieldErrorMsg={rateLimitErrMsg} />
                </Card>
              </Pane>
            </>
          );
        }}
      />
    </div>
  );
};

export default Signin;
