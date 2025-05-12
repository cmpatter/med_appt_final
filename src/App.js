import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
         <Route path="/" element={<Landing_page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
