import React from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../../redux/user/user.actions';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import ErrorMessage from '../../error-messages/error-messages.component';
import { selectErrorMessage } from '../../../redux/user/user.selectors';
import {
  Button,
  Text,
  TextInput,
  Heading,
} from 'evergreen-ui';
import { SignUpData } from '../user-auth.types';

const Signup = () => {

  const namesErrMsg = useSelector(selectErrorMessage('validationErrors', 'names'));
  const emailErrMsg = useSelector(selectErrorMessage('validationErrors', 'email'));
  const passwordErrMsg = useSelector(selectErrorMessage('validationErrors', 'password'));
  const confirmPasswordErrMsg = useSelector(selectErrorMessage('validationErrors', 'confirmPassword'));
  const signupErrMsg = useSelector(selectErrorMessage('duplicateEntityError', 'email'));
  const dispatch = useDispatch();

  const onSubmit = async (signUpData: SignUpData) => {
    console.log('submitting data: ', signUpData);    
    dispatch(signUpStart(signUpData));
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit, values }) => {
          console.log(values);
          return (
          <form onSubmit={handleSubmit}>
            <Heading size={800}>
              Sign Up
            </Heading>
            <div>
              <Field name="names" component="input">
                {props => (
                  <TextInput {...props.input} placeholder="names" width={'100%'} />
                )}
              </Field>
              <ErrorMessage fieldErrorMsg={namesErrMsg}/>
            </div>
            <div>
              <Field name="email" component="input">
                {props => (
                  <TextInput {...props.input} placeholder="email" width={'100%'} />
                )}
              </Field>
              <ErrorMessage fieldErrorMsg={emailErrMsg}/>
            </div>
            <div>
              <Field name="password" component="input">
                {props => (
                  <TextInput {...props.input} type='password' placeholder="password" width={'100%'} />
                )}
              </Field>
              <ErrorMessage fieldErrorMsg={passwordErrMsg}/>
            </div>
            <div>
              <Field name="confirmPassword" component="input">
                {props => (
                  <TextInput {...props.input} type='password' placeholder="confirm password" width={'100%'} />
                )}
              </Field>
              <ErrorMessage fieldErrorMsg={confirmPasswordErrMsg}/>
            </div>
            <ErrorMessage fieldErrorMsg={signupErrMsg}/>
            <Button width={'100%'} type='submit' appearance="primary" >
              Sign Up
            </Button>
            <Text>Already registered?</Text>
            <Link to='/signin'>
              <Text>Sign in here</Text>
            </Link>
          </form>
        )}}
      />
    </div>
  )
};

export default Signup;
