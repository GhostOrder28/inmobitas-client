import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { checkUserSession } from '../redux/user/user.actions';
import { selectCurrentUser } from '../redux/user/user.selectors';

import ListingPage from '../pages/listing-page/listing-page.component';
import ListingsPage from '../pages/listings-page/listings-page.component';
import DashboardPage from '../pages/dashboard-page/dashboard-page.component';
import Navigation from '../components/navigation/navigation.component';
import Signin from '../components/signin/signin.component';
import Signup from '../components/signup/signup.component';

import './app.css';

const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const userProtectedRoute = useCallback(ProtectedRoute => {
    return currentUser ? <ProtectedRoute /> : <Navigate to='/signin' />
  })

  useEffect(() => {
    dispatch(checkUserSession())
  }, [checkUserSession])

  const routes = useRoutes([
    {
      path: '/',
      element: currentUser ? <Navigate to='/dashboard' /> : <Navigate to='/signin' />
    },
    {
      path: '/signin',
      element: currentUser ? <Navigate to='/dashboard' /> : <Signin />
    },
    { path: '/dashboard', element: userProtectedRoute(DashboardPage) },
    { path: '/listings', element: userProtectedRoute(ListingsPage) },
    { path: '/newlisting', element: userProtectedRoute(ListingPage) },
    // { path: '*', element: <Navigate to='/signin' /> },
  ])

  return (
    <>
      <Navigation />
      { routes }
    </>
  )
}

export default App;
