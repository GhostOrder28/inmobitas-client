import React from "react";
import { signInStart } from "../../../redux/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { Button, Pane, TextInput, Heading } from "evergreen-ui";
import { selectErrorMessage } from "../../../redux/user/user.selectors";
import ErrorMessage from "../../error-messages/error-messages.component";
import { SignInData } from "../user-auth.types";

const Signin = () => {
  const emailErrMsg = useSelector(
  selectErrorMessage("validationErrors", "email")
  );

  const passwordErrMsg = useSelector(
  selectErrorMessage("validationErrors", "password")
  );
  const authErrMsg = useSelector(selectErrorMessage("authErrors"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (userData: SignInData) => {
    dispatch(signInStart(userData));
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit, values }) => {
          console.log("form values: ", values);
          return (
            <form onSubmit={handleSubmit}>
              <Heading size={800}>Sign In</Heading>
              <div>
                <Field name="email" component="input">
                  {(props) => (
                    <TextInput
                      {...props.input}
                      placeholder="email"
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
                      placeholder="password"
                      width={"100%"}
                    />
                  )}
                </Field>
                <ErrorMessage fieldErrorMsg={passwordErrMsg} />
              </div>
              <ErrorMessage fieldErrorMsg={authErrMsg} />
              <Pane display="flex">
                <Button width={"100%"} type="submit" appearance="primary">
                  Sign In
                </Button>
                <Button
                  width={"100%"}
                  type="button"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
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
