import { ParcelaUrbanismo } from '../types';

export function exportarCensoCSV(parcelas: ParcelaUrbanismo[]) {
  const headers = [
    'Parcela',
    'Manzana',
    'Calle',
    'Código Catastral',
    'Cédula Habitante',
    'Nombres',
    'Apellidos',
    'Parentesco',
    'Adulto Mayor',
    'Discapacidad',
    'Embarazada',
    'Estatus LOOU',
    'Solvencia Condominio'
  ];

  const rows: string[][] = [];

  parcelas.forEach((p) => {
    if (p.familia && p.familia.miembros.length > 0) {
      p.familia.miembros.forEach((m) => {
        rows.push([
          p.numeroParcela,
          p.manzana,
          p.calle,
          p.codigoCatastral,
          m.cedula,
          m.nombres,
          m.apellidos,
          m.parentesco,
          m.adultoMayor ? 'SÍ' : 'NO',
          m.discapacidad ? 'SÍ' : 'NO',
          m.embarazada ? 'SÍ' : 'NO',
          p.estatusNormativo,
          p.estatusSolvencia
        ]);
      });
    } else {
      rows.push([
        p.numeroParcela,
        p.manzana,
        p.calle,
        p.codigoCatastral,
        p.propietario.cedula,
        p.propietario.nombre,
        '',
        'PROPIETARIO',
        'NO',
        'NO',
        'NO',
        p.estatusNormativo,
        p.estatusSolvencia
      ]);
    }
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `censo_los_robles_araure_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportarCatastroCSV(parcelas: ParcelaUrbanismo[]) {
  const headers = [
    'Parcela',
    'Manzana',
    'Calle',
    'Código Catastral',
    'Propietario',
    'Cédula',
    'Área Terreno m²',
    'Área Const m²',
    '% Ubicación',
    '% Construcción',
    'Retiro Frente m',
    'Retiro Lat Izq m',
    'Retiro Lat Der m',
    'Retiro Fondo m',
    'Tanque Subterráneo Litros',
    'Estatus Normativo LOOU',
    'Estatus Solvencia'
  ];

  const rows = parcelas.map((p) => [
    p.numeroParcela,
    p.manzana,
    p.calle,
    p.codigoCatastral,
    p.propietario.nombre,
    p.propietario.cedula,
    p.areaTerrenoM2.toString(),
    p.areaConstruccionM2.toString(),
    `${p.porcentajeUbicacion}%`,
    `${p.porcentajeConstruccion}%`,
    p.retiros.frenteM.toString(),
    p.retiros.lateralIzqM.toString(),
    p.retiros.lateralDerM.toString(),
    p.retiros.fondoM.toString(),
    p.servicios.tanqueSubterraneoLitros.toString(),
    p.estatusNormativo,
    p.estatusSolvencia
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `catastro_los_robles_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
