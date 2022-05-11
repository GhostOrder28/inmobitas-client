import React, { useEffect, useCallback, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentUser } from '../redux/user/user.selectors';
import { clearErrors } from '../redux/user/user.actions';
import { Spinner } from 'evergreen-ui';
import AuthPage from '../pages/auth-page/auth-page.component';
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
  const navigate = useNavigate();

  const userProtectedRoute = useCallback((ProtectedRoute: React.ElementType): React.ReactNode => {
    return currentUser ? <ProtectedRoute /> : <Navigate to='/signin' />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    dispatch(clearErrors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/signin' element={currentUser ? <Navigate to='/dashboard' /> : <AuthPage />} />
          <Route path='/signup' element={currentUser ? <Navigate to='/dashboard' /> : <AuthPage />} />
          <Route path='/' element={<Navigation />}>
            <Route path='/' element={userProtectedRoute(DashboardPage)} />
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
