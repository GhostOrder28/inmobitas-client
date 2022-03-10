import React from 'react';
import { auth, signInWithEmailAndPassword } from '../../firebase/firebase.utils';
import { signInStart } from '../../redux/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import './signin.styles.css';
import { Button, Pane, Text, TextInput, majorScale, Heading } from 'evergreen-ui';
import { selectValidationErrorMessage, selectAuthErrorMessage } from '../../redux/user/user.selectors';
import ErrorMessage from '../error-messages/error-messages.component';

import axios from 'axios';

const Signin = () => {

  const emailErrMsg = useSelector(selectValidationErrorMessage('email'));
  const passwordErrMsg = useSelector(selectValidationErrorMessage('password'));
  const authErrMsg = useSelector(selectAuthErrorMessage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = userData => {
    if (!userData.password) return;
    dispatch(signInStart(userData))
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Heading size={800}>
              Sign In
            </Heading>
            <div>
              <Field name="email" component="input">
                {props => (
                  <TextInput
                    {...props.input}
                    placeholder="email"
                    width={'100%'}
                  />
                )}
              </Field>
              <ErrorMessage validationErrMsg={emailErrMsg}/>
            </div>
            <div>
              <Field name="password" component="input">
                {props => (
                  <TextInput
                    {...props.input}
                    type='password'
                    placeholder="password"
                    width={'100%'}
                  />
                )}
              </Field>
            </div>
            <ErrorMessage authErrMsg={authErrMsg}/>
            <Pane display='flex'>
              <Button width={'100%'} type='submit' appearance="primary" >
                Sign In
              </Button>
              <Button width={'100%'} type='button' onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </Pane>
          </form>
        )}
      />
    </div>
  )
};

export default Signin;
