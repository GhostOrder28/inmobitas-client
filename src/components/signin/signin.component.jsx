import React from 'react';
import { auth, signInWithEmailAndPassword } from '../../firebase/firebase.utils';
import { signInStart } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import './signin.styles.css';
import { Button, Pane, Text, TextInput, majorScale, Heading } from 'evergreen-ui';

const Signin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = userData => {
    // const { email, password, confirmPassword } = userData;
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
                  <TextInput {...props.input} placeholder="email" />
                )}
              </Field>
            </div>
            <div>
              <Field name="password" component="input">
                {props => (
                  <TextInput {...props.input} type='password' placeholder="password" />
                )}
              </Field>
            </div>
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
