import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-cash-coin fs-3 me-2"></i>
          POS Caja
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => `nav-link px-3 ${isActive ? 'active fw-bold bg-white text-primary rounded' : ''}`} 
                to="/apertura">
                <i className="bi bi-door-open me-1"></i> Abrir Caja
              </NavLink>
            </li>
            <li className="nav-item mx-lg-2">
              <NavLink 
                className={({isActive}) => `nav-link px-3 ${isActive ? 'active fw-bold bg-white text-primary rounded' : ''}`} 
                to="/cierre">
                <i className="bi bi-door-closed me-1"></i> Cerrar Caja
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => `nav-link px-3 ${isActive ? 'active fw-bold bg-white text-primary rounded' : ''}`} 
                to="/historial">
                <i className="bi bi-table me-1"></i> Historial
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
