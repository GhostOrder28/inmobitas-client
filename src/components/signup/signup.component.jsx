import React from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate, Link } from 'react-router-dom';
import './signup.styles.css';
import {
  Button,
  Pane,
  Text,
  TextInput,
  majorScale,
  Heading,
} from 'evergreen-ui';

const Signup = () => {

  const onSubmit = async values => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) return
    console.log('form submitted!');
    console.log(values);
  };

  return (
    <div>
      <Pane
        width={400}
        padding={50}
        elevation={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Form
          onSubmit={onSubmit}
          // validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Heading size={800}>
                Sign Up
              </Heading>
              <div>
                <Field name="names" component="input">
                  {props => (
                    <TextInput {...props.input} placeholder="names" />
                  )}
                </Field>
              </div>
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
              <div>
                <Field name="confirmPassword" component="input">
                  {props => (
                    <TextInput {...props.input} type='password' placeholder="confirm password" />
                  )}
                </Field>
              </div>
              <Button width={'100%'} type='submit' appearance="primary" >
                Sign Up
              </Button>
              <Text>Already registered?</Text>
              <Link to='/signin'>
                <Text>Sign in here</Text>
              </Link>
            </form>
          )}
        />
      </Pane>
    </div>
  )
};

export default Signup;
