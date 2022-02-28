import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";
import AuthPage from '../pages/auth-page/auth-page.component';
import ListingPage from '../pages/listing-page/listing-page.component';

import './app.css';

function App() {
  return (
    <div className='flex justify-center mt4'>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/signin' element={<AuthPage />} />
        <Route path='/signup' element={<AuthPage />} />
        <Route path='/newlisting' element={<ListingPage />} />
      </Routes>
    </div>
  );
}

export default App;
