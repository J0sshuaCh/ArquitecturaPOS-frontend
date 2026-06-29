import React, { useState, useEffect } from 'react';
import { getHistorial, abrirTurno, cerrarTurno } from '../services/api';

const CajaManager = () => {
    const [historial, setHistorial] = useState([]);
    const [cajero, setCajero] = useState('');
    const [montoApertura, setMontoApertura] = useState('');
    
    const [idTurno, setIdTurno] = useState('');
    const [montoCierre, setMontoCierre] = useState('');
    
    const [turnoActivo, setTurnoActivo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchHistorial();
    }, []);

    const fetchHistorial = async () => {
        try {
            const res = await getHistorial();
            setHistorial(res.data);
            
            // Re-evaluate if there is an active turno
            const active = res.data.find(t => t.estado === 1);
            setTurnoActivo(active || null);
            if(active) {
                setIdTurno(active.id);
            }
        } catch (err) {
            console.error(err);
            setError('Error al obtener el historial de turnos');
        }
    };

    const handleAbrir = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        try {
            const res = await abrirTurno({ cajero, montoApertura: parseFloat(montoApertura) });
            setTurnoActivo(res.data);
            setIdTurno(res.data.id);
            setCajero('');
            setMontoApertura('');
            setSuccess(`Turno #${res.data.id} abierto correctamente.`);
            fetchHistorial();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al abrir caja');
        }
    };

    const handleCerrar = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        try {
            await cerrarTurno({ id: parseInt(idTurno), montoCierre: parseFloat(montoCierre) });
            setTurnoActivo(null);
            setIdTurno('');
            setMontoCierre('');
            setSuccess(`Turno #${idTurno} cerrado correctamente.`);
            fetchHistorial();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cerrar caja');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">POS - Sistema de Caja</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="row">
                {/* APERTURA */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-success">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">Abrir Caja</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAbrir}>
                                <div className="mb-3">
                                    <label className="form-label">Cajero</label>
                                    <input type="text" className="form-control" value={cajero} onChange={e => setCajero(e.target.value)} disabled={!!turnoActivo} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Monto de Apertura</label>
                                    <input type="number" step="0.01" className="form-control" value={montoApertura} onChange={e => setMontoApertura(e.target.value)} disabled={!!turnoActivo} required />
                                </div>
                                <button type="submit" className="btn btn-success w-100" disabled={!!turnoActivo}>Abrir Turno</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* CIERRE */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-danger">
                        <div className="card-header bg-danger text-white">
                            <h5 className="mb-0">Cerrar Caja</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleCerrar}>
                                <div className="mb-3">
                                    <label className="form-label">ID Turno</label>
                                    <input type="text" className="form-control" value={idTurno} readOnly disabled />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Monto de Cierre</label>
                                    <input type="number" step="0.01" className="form-control" value={montoCierre} onChange={e => setMontoCierre(e.target.value)} disabled={!turnoActivo} required />
                                </div>
                                <button type="submit" className="btn btn-danger w-100" disabled={!turnoActivo}>Cerrar Turno</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLA */}
            <div className="card shadow-sm mt-4">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Historial de Turnos</h5>
                    <button className="btn btn-sm btn-outline-light" onClick={fetchHistorial}>Refrescar</button>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Cajero</th>
                                    <th>Apertura</th>
                                    <th>Cierre</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historial.length === 0 ? (
                                    <tr><td colSpan="6" className="text-center">No hay registros</td></tr>
                                ) : (
                                    historial.map(t => (
                                        <tr key={t.id}>
                                            <td>{t.id}</td>
                                            <td>{t.cajero}</td>
                                            <td>S/ {t.montoApertura?.toFixed(2)}</td>
                                            <td>{t.montoCierre != null ? `S/ ${t.montoCierre.toFixed(2)}` : '-'}</td>
                                            <td>{new Date(t.fechaApertura).toLocaleString()}</td>
                                            <td>
                                                {t.estado === 1 
                                                    ? <span className="badge bg-success">Abierto</span>
                                                    : <span className="badge bg-secondary">Cerrado</span>}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CajaManager;
