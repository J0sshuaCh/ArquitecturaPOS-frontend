import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AperturaCaja from './pages/AperturaCaja';
import CierreCaja from './pages/CierreCaja';
import HistorialTurnos from './pages/HistorialTurnos';

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100 pb-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/historial" replace />} />
          <Route path="/apertura" element={<AperturaCaja />} />
          <Route path="/cierre" element={<CierreCaja />} />
          <Route path="/historial" element={<HistorialTurnos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
