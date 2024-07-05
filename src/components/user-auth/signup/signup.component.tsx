import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FieldErrorMessage from '../../field-error-message/field-error-message.component';
import { selectValidationError } from '../../../redux/user/user.selectors';
import {
  Pane,
  Button,
  Text,
  Heading,
  minorScale
} from 'evergreen-ui';
import { onSubmitSignupData } from './signup.api';
import { useForm } from 'react-hook-form';
import { SignUpData } from '../user-auth.types';
import { SIGN_UP_INITIAL_STATE } from './signup.consts';
import Input from '../../input/input.component';
import Form from '../../form/from.component';

const Signup = () => {

  const namesErrMsg = useSelector(selectValidationError('names'));
  const emailErrMsg = useSelector(selectValidationError('email'));
  const contactPhoneErrMsg = useSelector(selectValidationError('contactPhone'));
  const passwordErrMsg = useSelector(selectValidationError('password'));
  const confirmPasswordErrMsg = useSelector(selectValidationError('confirmPassword'));
  const signupErrMsg = useSelector(selectValidationError('email'));

  const { t } = useTranslation(['ui']);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignUpData>({
    defaultValues: SIGN_UP_INITIAL_STATE,
  });

  const inputCommonProps = {
    register, errors
  };

  return (
    <Pane display="flex" flexDirection="column" gap={ minorScale(5) }>
      <Heading size={800}>
        { t('signup') } 
      </Heading>
      <Form onSubmit={handleSubmit((formData) => onSubmitSignupData(formData))}>
        <Input name="names" type="text" placeholder={ t("names") } { ...inputCommonProps } />
        <FieldErrorMessage message={namesErrMsg} />
        <Input name="email" type="text" placeholder={ t("email") } { ...inputCommonProps } />
        <FieldErrorMessage message={emailErrMsg} />
        <Input name="contactPhone" type="text" placeholder={ t("contactPhone") } { ...inputCommonProps } />
        <FieldErrorMessage message={contactPhoneErrMsg} />
        <Input name="password" type="password" placeholder={ t("password") } { ...inputCommonProps } />
        <FieldErrorMessage message={passwordErrMsg} />
        <Input name="confirmPassword" type="password" placeholder={ t("confirmPassword") } { ...inputCommonProps } />
        <FieldErrorMessage message={confirmPasswordErrMsg} />
        <FieldErrorMessage message={signupErrMsg}/>
        <Button width={'100%'} type='submit' appearance="primary" >
          { t('signup') }
        </Button>
        <Pane>
          <Text marginRight={ minorScale(2) }>{ t('alreadyRegistered') }</Text>
          <Link to='/signin'>
            <Text>{ t('signInHere') }</Text>
          </Link>
        </Pane>
      </Form>
    </Pane>
  )
};

export default Signup;
