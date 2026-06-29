import React, { useState } from 'react';
import TurnoService from '../services/TurnoService';
import Swal from 'sweetalert2';

const CierreCaja = () => {
  const [id, setId] = useState('');
  const [montoFinal, setMontoFinal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || isNaN(id) || montoFinal === '') {
      Swal.fire('Error', 'ID de turno inválido o monto de cierre vacío', 'error');
      return;
    }

    try {
      await TurnoService.cerrarTurno({ id: parseInt(id), montoCierre: parseFloat(montoFinal) });
      Swal.fire('Éxito', 'Turno cerrado exitosamente', 'success');
      setId('');
      setMontoFinal('');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Error al cerrar la caja';
      Swal.fire('Error', msg, 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-danger">
            <div className="card-header bg-danger text-white">
              <h4 className="mb-0 text-center"><i className="bi bi-box-arrow-right"></i> Cierre de Caja</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">ID del Turno Activo</label>
                  <input 
                    type="number" 
                    className="form-control form-control-lg" 
                    placeholder="Ej. 12"
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Monto de Cierre</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text">$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      className="form-control" 
                      placeholder="0.00"
                      value={montoFinal} 
                      onChange={(e) => setMontoFinal(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-danger btn-lg w-100 fw-bold">
                  Procesar Cierre
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CierreCaja;
