import api from '../config/axiosConfig';

const TurnoService = {
  abrirTurno: async (datosApertura) => {
    // datosApertura: { cajero, montoInicial }
    const response = await api.post('/turnos/abrir', datosApertura);
    return response.data;
  },

  cerrarTurno: async (datosCierre) => {
    // datosCierre: { id, montoCierre }
    const response = await api.put('/turnos/cerrar', datosCierre);
    return response.data;
  },

  obtenerHistorial: async () => {
    const response = await api.get('/turnos');
    return response.data;
  }
};

export default TurnoService;
