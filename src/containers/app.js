import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useRoutes, useLocation } from "react-router-dom";
import { selectCurrentUser, selectErrors } from '../redux/user/user.selectors';
import { clearErrors } from '../redux/user/user.actions';

import ListingPage from '../pages/listing-page/listing-page.component';
import ListingsPage from '../pages/listings-page/listings-page.component';
import OwnerPage from '../pages/owner-page/owner-page.component';
import OwnersPage from '../pages/owners-page/owners-page.component';
import DashboardPage from '../pages/dashboard-page/dashboard-page.component';
import Navigation from '../components/navigation/navigation.component';
import Signin from '../components/signin/signin.component';
import Signup from '../components/signup/signup.component';

import './app.css';

const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const userProtectedRoute = useCallback(ProtectedRoute => {
    return currentUser ? <ProtectedRoute /> : <Navigate to='/signin' />
  })

  const routes = useRoutes([
    {
      path: 'signin',
      element: currentUser ? <Navigate to='/dashboard' /> : <Signin />
    },
    {
      path: 'signup',
      element: currentUser ? <Navigate to='/dashboard' /> : <Signup />
    },
    { path: 'dashboard', element: userProtectedRoute(DashboardPage) },
    { path: 'listings', element: userProtectedRoute(ListingsPage) },
    { path: 'newlisting', element: userProtectedRoute(ListingPage) },
    { path: 'listingdetail/:listingid', element: userProtectedRoute(ListingPage) },
    { path: 'editlisting/:listingid', element: userProtectedRoute(ListingPage) },
    { path: 'owners', element: userProtectedRoute(OwnersPage) },
    { path: 'clientdetail/:clientid', element: userProtectedRoute(OwnerPage) },
    {
      path: '/',
      element: currentUser ? <Navigate to='/dashboard' /> : <Navigate to='/signin' />
    },
  ])

  useEffect(() => {
    dispatch(clearErrors())
  }, [location]);

  return (
    <>
      <Navigation />
      { routes }
    </>
  )
}

export default App;
