import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Heading, Pane, minorScale } from "evergreen-ui";

import { SignInData } from "../user-auth.types";
import { options } from '../../../http/http';
import FieldErrorMessage from "../../field-error-message/field-error-message.component";
import { selectValidationError, selectServerError, selectClientError, selectUserSignedOut } from "../../../redux/user/user.selectors";
import useWindowDimensions from '../../../hooks/use-window-dimensions';
import GoogleIcon from "../../../icons/social-media-icons/google.icon";
import { TABLET_BREAKPOINT_VALUE } from '../../../constants/breakpoints.constants';
import { onSubmitSigninData } from "./signin.api";
import { useForm } from "react-hook-form";

import './signin.styles.css';
import { SIGN_IN_INITIAL_STATE } from "./signin.consts";
import Input from "../../input/input.component";
import GuestSection from "./subcomponents/guest-section.subcomponent";
import Form from "../../form/from.component";

const signinWithGoogle = async () => {
  const url = `${options.baseURL}auth/google`;
  window.open(url, "_self");
}

const Signin = () => {
  const emailErrMsg = useSelector(selectValidationError("email"));
  const authErrMsg = useSelector(selectServerError("authenticationError"));
  const dbConnectionError = useSelector(selectServerError("dbConnectionError"));
  const clientError = useSelector(selectClientError);
  const userSignedOut = useSelector(selectUserSignedOut);

  const { windowInnerWidth  } = useWindowDimensions();
  const navigate = useNavigate();
  const { t } = useTranslation(['ui']);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>({
    defaultValues: SIGN_IN_INITIAL_STATE,
  });

  const inputCommonProps = { register };

  // useEffect(() => {
  //   console.log('userSignedOut: ', userSignedOut);
  //   if (!userSignedOut) dispatch(requestUserInfoForSignInStart(http));
  // }, [])

  return (
    <Pane display="flex" flexDirection="column" gap={ minorScale(5) }>
      <Heading size={800}>{ t('signin') }</Heading>
      <Pane 
        display={'flex'}
        gap={ minorScale(10) }
        flexDirection={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? 'row' : 'column' }
      >
        <Form onSubmit={ handleSubmit((formData: SignInData) => onSubmitSigninData(formData)) }>
          <Pane>
            <Input name='email' type="text" placeholder={ t('email') } { ...inputCommonProps } />
            <FieldErrorMessage message={emailErrMsg} />
          </Pane>
          <Input name='password' type="password" placeholder={ t('password') } { ...inputCommonProps } />
          { (authErrMsg || dbConnectionError || clientError) ?
            <Pane>
              <FieldErrorMessage message={authErrMsg} />
              <FieldErrorMessage message={dbConnectionError} />
              <FieldErrorMessage message={clientError} />
            </Pane> : ""
          }
          <Pane 
            display="flex" 
            gap={ minorScale(5) }
            flexDirection={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? 'row' : 'column' }
          >
            <Button width={"100%"} type="submit" appearance="primary">
              { t('signin') } 
            </Button>
            {/* <Button iconBefore={GoogleIcon} width={'100%'} type='button' appearance="default" onClick={signinWithGoogle}> */}
            {/* { t('signinWithGoogle') } */}
            {/* </Button> */}
            <Button
              width={"100%"}
              type="button"
              onClick={() => navigate("/signup")}
            >
              { t('signup') } 
            </Button>
          </Pane>
        </Form>
        <GuestSection />
      </Pane>
    </Pane>
  );
};

export default Signin;
