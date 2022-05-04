import React, { useEffect, useCallback, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from "react-router-dom";
import { selectCurrentUser } from '../redux/user/user.selectors';
import { clearErrors } from '../redux/user/user.actions';
import { Spinner } from 'evergreen-ui';
import ErrorBoundary from '../components/error-boundary/error-boundary.component';
import './app.css';

const ListingPage = lazy(() => import('../pages/listing-page/listing-page.component'));
const ListingsPage = lazy(() => import('../pages/listings-page/listings-page.component'));
const OwnerPage = lazy(() => import('../pages/owner-page/owner-page.component'));
const OwnersPage = lazy(() => import('../pages/owners-page/owners-page.component'));
const DashboardPage = lazy(() => import('../pages/dashboard-page/dashboard-page.component'));
const Navigation = lazy(() => import('../components/navigation/navigation.component'));
const Signin = lazy(() => import('../components/user-auth/signin/signin.component'));
const Signup = lazy(() => import('../components/user-auth/signup/signup.component'));

const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const userProtectedRoute = useCallback((ProtectedRoute: React.ElementType): React.ReactNode => {
    return currentUser ? <ProtectedRoute /> : <Signin />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(clearErrors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route path='/' element={userProtectedRoute(DashboardPage)} />
            <Route path='signin' element={currentUser ? <DashboardPage /> : <Signin />} />
            <Route path='signup' element={currentUser ? <DashboardPage /> : <Signup />} />
            <Route path='dashboard' element={userProtectedRoute(DashboardPage)} />
            <Route path='listings' element={userProtectedRoute(ListingsPage)} />
            <Route path='newlisting' element={userProtectedRoute(ListingPage)} />
            <Route path='listingdetail/:listingid' element={userProtectedRoute(ListingPage)} />
            <Route path='editlisting/:listingid' element={userProtectedRoute(ListingPage)} />
            <Route path='owners' element={userProtectedRoute(OwnersPage)} />
            <Route path='clientdetail/:clientid' element={userProtectedRoute(OwnerPage)} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App;
