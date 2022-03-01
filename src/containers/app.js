import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";
import AuthPage from '../pages/auth-page/auth-page.component';
import ListingPage from '../pages/listing-page/listing-page.component';
import ListingsPage from '../pages/listings-page/listings-page.component';
import Navigation from '../components/navigation/navigation.component';

import './app.css';

function App() {
  return (
    <div className='flex flex-column justify-center pa4'>
      <Navigation />
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/signin' element={<AuthPage />} />
        <Route path='/signup' element={<AuthPage />} />
        <Route path='/newlisting' element={<ListingPage />} />
        <Route path='/listings' element={<ListingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
