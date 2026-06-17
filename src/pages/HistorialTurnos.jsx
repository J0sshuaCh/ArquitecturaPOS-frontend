import React, { useEffect, useState } from 'react';
import TurnoService from '../services/TurnoService';

const HistorialTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTurnos = async () => {
    setLoading(true);
    try {
      console.log("Iniciando petición de historial...");
      const data = await TurnoService.obtenerHistorial();
      console.log("Datos recibidos del backend:", data);
      setTurnos(data);
    } catch (error) {
      console.error("Error al obtener el historial", error);
      if (error.response) {
        console.error("Detalles del error del servidor:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <h4 className="mb-0"><i className="bi bi-clock-history me-2"></i>Historial de Turnos</h4>
          <button 
            className="btn btn-outline-light btn-sm px-3" 
            onClick={fetchTurnos}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Refrescar Datos'}
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="py-3">Cajero</th>
                  <th className="py-3">Apertura</th>
                  <th className="py-3">Cierre</th>
                  <th className="py-3">Fecha / Hora</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => {
                  // Determine status based on multiple possible object properties to match backend
                  const isAbierto = turno.estado === 'Abierto' || turno.estado === 1 || turno.estado === '1' || (turno.montoCierre === null);
                  
                  return (
                    <tr key={turno.id}>
                      <td className="px-4 fw-bold text-muted">#{turno.id}</td>
                      <td className="fw-semibold">{turno.cajero}</td>
                      <td>$ {(turno.montoApertura || 0).toFixed(2)}</td>
                      <td>
                        {turno.montoCierre !== null && turno.montoCierre !== undefined
                          ? `$ ${turno.montoCierre.toFixed(2)}`
                          : <span className="text-muted fst-italic">Pendiente</span>}
                      </td>
                      <td>{turno.fechaCreacion || turno.fechaApertura ? new Date(turno.fechaCreacion || turno.fechaApertura).toLocaleString() : '-'}</td>
                      <td className="px-4 text-center">
                        {isAbierto ? (
                          <span className="badge bg-success rounded-pill px-3 py-2">ABIERTO</span>
                        ) : (
                          <span className="badge bg-secondary rounded-pill px-3 py-2">CERRADO</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {turnos.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                      No hay turnos registrados en el sistema.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialTurnos;
