import React from 'react';

import { Route, useLocation } from 'react-router-dom';
import Signin from '../../components/signin/signin.component';
import Signup from '../../components/signup/signup.component';

const AuthPage = () => {
  const location = useLocation();
  return (
    <>
      {
        location.pathname === '/signin' ?
          <Signin /> :
          <Signup />
      }
    </>
  )
};

export default AuthPage;
