import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './views/Home';
import Login from './views/Login/index.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="/*" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App;
