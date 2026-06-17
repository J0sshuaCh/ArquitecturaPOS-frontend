import api from '../config/axiosConfig';

export const getHistorial = () => api.get('/turnos/');
export const abrirTurno = (data) => api.post('/turnos/abrir', data);
export const cerrarTurno = (data) => api.put('/turnos/cerrar', data);
