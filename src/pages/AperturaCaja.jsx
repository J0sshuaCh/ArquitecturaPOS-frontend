import React, { useState } from 'react';
import TurnoService from '../services/TurnoService';
import Swal from 'sweetalert2';

const AperturaCaja = () => {
  const [cajero, setCajero] = useState('');
  const [montoInicial, setMontoInicial] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cajero.trim() || montoInicial < 0) {
      Swal.fire('Error', 'El nombre del cajero no puede estar vacío y el monto no puede ser negativo', 'error');
      return;
    }

    try {
      const cajeroNormalizado = cajero.trim().toUpperCase();
      const response = await TurnoService.abrirTurno({ cajero: cajeroNormalizado, montoApertura: parseFloat(montoInicial) });
      Swal.fire('Éxito', `Caja abierta exitosamente. ID de Turno: ${response.id || response}`, 'success');
      setCajero('');
      setMontoInicial('');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Error al abrir la caja';
      Swal.fire('Error', msg, 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-success">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0 text-center"><i className="bi bi-box-arrow-in-right"></i> Apertura de Caja</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Nombre del Cajero</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Ej. Juan Pérez"
                    value={cajero} 
                    onChange={(e) => setCajero(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Monto de Apertura</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text">S/.</span>
                    <input 
                      type="number" 
                      step="0.01"
                      className="form-control" 
                      placeholder="0.00"
                      value={montoInicial} 
                      onChange={(e) => setMontoInicial(e.target.value)} 
                      required 
                      min="0"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success btn-lg w-100 fw-bold">
                  Abrir Caja Ahora
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AperturaCaja;
