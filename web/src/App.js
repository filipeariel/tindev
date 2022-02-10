import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

import Login from './pages/Login.js'
import Main from './pages/Main.js'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dev/:id" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
