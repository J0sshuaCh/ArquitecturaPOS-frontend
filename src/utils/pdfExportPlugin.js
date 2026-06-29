import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importación directa de la función

export const exportarHistorialPDF = (turnos) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  // Configuración del Título
  doc.setFontSize(18);
  doc.text('Reporte de Historial de Turnos de Caja', 14, 22);
  
  doc.setFontSize(10);
  const fechaGeneracion = new Date().toLocaleDateString();
  const horaGeneracion = new Date().toLocaleTimeString();
  doc.text(`Fecha de emisión: ${fechaGeneracion} ${horaGeneracion}`, 14, 30);

  // Definir las columnas de la tabla coincidiendo con tu interfaz
  const columnas = ["ID", "Cajero", "Apertura", "Cierre", "Fecha / Hora", "Estado"];

  // Mapear los datos exactos que vienen de tu backend
  const filas = turnos.map(turno => {
    // Replicamos tu lógica de estado
    const isAbierto = turno.estado === 'Abierto' || turno.estado === 1 || turno.estado === '1' || (turno.montoCierre === null);
    const estadoTexto = isAbierto ? 'ABIERTO' : 'CERRADO';
    
    // Formateo de fecha
    const fechaTexto = turno.fechaCreacion || turno.fechaApertura 
      ? new Date(turno.fechaCreacion || turno.fechaApertura).toLocaleString() 
      : '-';

    // Formateo de montos
    const montoApertura = `$ ${(turno.montoApertura || 0).toFixed(2)}`;
    const montoCierre = turno.montoCierre !== null && turno.montoCierre !== undefined
      ? `$ ${turno.montoCierre.toFixed(2)}`
      : 'Pendiente';

    return [
      `#${turno.id}`,
      turno.cajero,
      montoApertura,
      montoCierre,
      fechaTexto,
      estadoTexto
    ];
  });

  // Generar la tabla usando la función autoTable e inyectando 'doc'
  autoTable(doc, {
    startY: 35,
    head: [columnas],
    body: filas,
    theme: 'striped',
    headStyles: { 
      fillColor: [220, 53, 69], // Tono rojo profesional
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      5: { halign: 'center' }
    },
    styles: {
      fontSize: 10,
      cellPadding: 4
    }
  });

  // Disparar la descarga
  doc.save('historial_turnos_caja.pdf');
};