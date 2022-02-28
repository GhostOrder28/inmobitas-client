import React from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import './signin.styles.css';
import { Button, Pane, Text, TextInput, majorScale, Heading } from 'evergreen-ui';

const Signin = () => {

  const navigate = useNavigate();

  const onSubmit = async values => {
    // if (values.password)
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
                Sign In
              </Heading>
              <div>
                <Field name="firstName" component="input">
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
      </Pane>
    </div>
  )
};

export default Signin;
