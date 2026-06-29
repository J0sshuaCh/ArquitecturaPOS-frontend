//Plugin de Exportación a PDF para el Historial de Turnos de Caja

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportarHistorialPDF = (turnos) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  doc.setFontSize(18);
  doc.text('Reporte de Historial de Turnos de Caja', 14, 22);
  
  doc.setFontSize(10);
  const fechaGeneracion = new Date().toLocaleDateString();
  const horaGeneracion = new Date().toLocaleTimeString();
  doc.text(`Fecha de emisión: ${fechaGeneracion} ${horaGeneracion}`, 14, 30);

  const columnas = ["ID", "Cajero", "Apertura", "Cierre", "Fecha / Hora", "Estado"];

  const filas = turnos.map(turno => {
    const isAbierto = turno.estado === 'Abierto' || turno.estado === 1 || turno.estado === '1' || (turno.montoCierre === null);
    const estadoTexto = isAbierto ? 'ABIERTO' : 'CERRADO';
    
    const fechaTexto = turno.fechaCreacion || turno.fechaApertura 
      ? new Date(turno.fechaCreacion || turno.fechaApertura).toLocaleString() 
      : '-';

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

  autoTable(doc, {
    startY: 35,
    head: [columnas],
    body: filas,
    theme: 'striped',
    headStyles: { 
      fillColor: [220, 53, 69],
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

  doc.save('historial_turnos_caja.pdf');
};