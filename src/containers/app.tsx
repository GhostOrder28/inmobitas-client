import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import withPresets from "../hoc/with-presets.component";

import { selectCurrentUser, selectServerError } from "../redux/user/user.selectors";
import { clearErrors } from "../redux/user/user.actions";
import { Spinner, ThemeProvider, mergeTheme, defaultTheme } from "evergreen-ui";
import ErrorBoundary from "../components/error-boundary/error-boundary.component";
import inmobitasTheme from "../global-styles/evergreen-custom-theme";
import "../i18n/i18n.js";
import "./app.css";

const ListingPage = lazy(() => import("../pages/listing-page/listing-page.component"));
const ListingsPage = lazy(() => import("../pages/listings-page/listings-page.component"));
const ClientPage = lazy(() => import("../pages/client-page/client-page.component"));
const ClientsPage = lazy(() => import("../pages/clients-page/clients-page.component"));
const DashboardPage = lazy(() => import("../pages/dashboard-page/dashboard-page.component"));
const Navigation = lazy(() => import("../components/navigation/navigation.component"));
const AuthPage = lazy(() => import("../pages/auth-page/auth-page.component"));
const AgendaPage = lazy(() => import("../pages/agenda-page/agenda-page.component"));
const ListingInfo = lazy(() => import("../components/listing-info/listing-info.component"));
const PhotoGallery = lazy(() => import("../components/photo-gallery/photo-gallery.component"));
const ClientInfo = lazy(() => import("../components/client-info/client-info.component"));
const ClientForm = lazy(() => import("../components/client-form/client-form.component"));
const ListingForm = lazy(() => import("../components/listing-form/listing-form.component"));

const theme = mergeTheme(defaultTheme, inmobitasTheme)

const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  const userSessionExpiredError = useSelector(selectServerError("userSessionExpiredError"));
  const dispatch = useDispatch();
  const location = useLocation();

  const userProtectedRoute = useCallback((ProtectedRoute: React.ElementType): React.ReactNode => {
   return currentUser ? <ProtectedRoute /> : <Navigate to="/signin" />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    if (!userSessionExpiredError) dispatch(clearErrors())
  }, [location]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <ThemeProvider value={theme}>
          <Routes>
            <Route path="/signin" element={currentUser ? <Navigate to='/dashboard' /> : <AuthPage />} />
            <Route path="/signup" element={currentUser ? <Navigate to='/dashboard' /> : <AuthPage />} />
            <Route path="/" element={<Navigation />}>
              <Route path="/" element={userProtectedRoute(DashboardPage)} />
              <Route path="dashboard" element={userProtectedRoute(DashboardPage)} />
              <Route path="listings" element={userProtectedRoute(ListingsPage)} />
              <Route path="newlisting" element={withPresets(ListingForm)} />
              <Route path="client/:clientId" element={userProtectedRoute(ClientPage)} >
                <Route path="info" element={userProtectedRoute(ClientInfo)} />
                <Route path="edit" element={userProtectedRoute(ClientForm)} />
              </Route>
              <Route path="client/:clientId/listing/:estateId" element={userProtectedRoute(ListingPage)}>
                <Route path="info/*" element={userProtectedRoute(ListingInfo)} />
                <Route path="edit/*" element={userProtectedRoute(ListingInfo)} />
                <Route path="gallery" element={userProtectedRoute(PhotoGallery)} />
              </Route>
              <Route path="clients" element={userProtectedRoute(ClientsPage)} />
              <Route path="agenda" element={userProtectedRoute(AgendaPage)} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App;
