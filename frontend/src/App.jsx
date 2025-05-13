// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; // Navbar'ı import ediyoruz
import Footer from './Footer'; // Footer'ı import ediyoruz
import Dashboard from './pages/Dashboard';
import Trade from './components/Trade';
import Login from './pages/LoginPage';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar her sayfada görünsün */}
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer her sayfada görünsün */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
