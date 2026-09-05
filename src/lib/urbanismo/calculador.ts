import { EvaluacionNormativaResultado, ParcelaUrbanismo, Zonificacion } from "../types";

/**
 * Parámetros urbanos exigidos según Ordenanza Municipal de Urbanismo y LOOU en Venezuela.
 */
export const PARAMETROS_NORMATIVOS_VENEZUELA = {
  R1_UNIFAMILIAR: {
    nombre: "Residencial R-1 (Unifamiliar Exclusiva)",
    retiroFrenteMinM: 5.0,
    retiroLateralMinM: 3.0,
    retiroFondoMinM: 4.0,
    porcentajeUbicacionMax: 50.0,
    porcentajeConstruccionMax: 100.0,
    alturaMaximaPlantas: 2,
    porcentajeAreaPermeableMin: 25.0,
    dotacionLitrosPorHabitanteDia: 300,
  },
  R2_BIFAMILIAR: {
    nombre: "Residencial R-2 (Unifamiliar y Bifamiliar)",
    retiroFrenteMinM: 4.0,
    retiroLateralMinM: 2.0,
    retiroFondoMinM: 3.0,
    porcentajeUbicacionMax: 65.0,
    porcentajeConstruccionMax: 130.0,
    alturaMaximaPlantas: 2,
    porcentajeAreaPermeableMin: 15.0,
    dotacionLitrosPorHabitanteDia: 250,
  },
  R3_MULTIFAMILIAR: {
    nombre: "Residencial R-3 (Multifamiliar Baja Densidad)",
    retiroFrenteMinM: 6.0,
    retiroLateralMinM: 4.0,
    retiroFondoMinM: 5.0,
    porcentajeUbicacionMax: 55.0,
    porcentajeConstruccionMax: 180.0,
    alturaMaximaPlantas: 4,
    porcentajeAreaPermeableMin: 20.0,
    dotacionLitrosPorHabitanteDia: 200,
  },
  C1_COMERCIAL_LOCAL: {
    nombre: "Comercial Comunal Vecinal C-1",
    retiroFrenteMinM: 3.0,
    retiroLateralMinM: 0.0,
    retiroFondoMinM: 3.0,
    porcentajeUbicacionMax: 80.0,
    porcentajeConstruccionMax: 200.0,
    alturaMaximaPlantas: 2,
    porcentajeAreaPermeableMin: 10.0,
    dotacionLitrosPorHabitanteDia: 150,
  },
  AV_AREA_VERDE_RECREATIVA: {
    nombre: "Área Verde y Parque Recreativo",
    retiroFrenteMinM: 5.0,
    retiroLateralMinM: 5.0,
    retiroFondoMinM: 5.0,
    porcentajeUbicacionMax: 15.0,
    porcentajeConstruccionMax: 15.0,
    alturaMaximaPlantas: 1,
    porcentajeAreaPermeableMin: 70.0,
    dotacionLitrosPorHabitanteDia: 50,
  }
};

/**
 * Evalúa el cumplimiento de parámetros urbanísticos venezolanos para una parcela o propuesta.
 */
export function evaluarParametrosUrbanisticos(
  parcela: {
    areaTerrenoM2: number;
    areaConstruccionM2: number;
    areaUbicacionM2?: number;
    porcentajeUbicacion?: number;
    plantasConstruidas: number;
    zonificacion: Zonificacion;
    retiroFrenteM: number;
    retiroLateralIzqM: number;
    retiroLateralDerM: number;
    retiroFondoM: number;
    areaPermeableM2: number;
    tanqueSubterraneoLitros?: number;
    numeroHabitantes?: number;
  }
): EvaluacionNormativaResultado {
  const norma = PARAMETROS_NORMATIVOS_VENEZUELA[parcela.zonificacion] || PARAMETROS_NORMATIVOS_VENEZUELA.R2_BIFAMILIAR;
  
  // Cálculos de porcentajes
  const porcentajeUbicacion = parcela.porcentajeUbicacion ?? 
    (parcela.areaUbicacionM2 ? (parcela.areaUbicacionM2 / parcela.areaTerrenoM2) * 100 : 60);
  const porcentajeConstruccion = (parcela.areaConstruccionM2 / parcela.areaTerrenoM2) * 100;
  const porcentajePermeable = (parcela.areaPermeableM2 / parcela.areaTerrenoM2) * 100;

  // Verificación de retiros
  const frenteCumple = parcela.retiroFrenteM >= norma.retiroFrenteMinM;
  const lateralIzqCumple = parcela.retiroLateralIzqM >= norma.retiroLateralMinM;
  const lateralDerCumple = parcela.retiroLateralDerM >= norma.retiroLateralMinM;
  const fondoCumple = parcela.retiroFondoM >= norma.retiroFondoMinM;

  // Verificación de densidades y alturas
  const ubicacionCumple = porcentajeUbicacion <= norma.porcentajeUbicacionMax;
  const construccionCumple = porcentajeConstruccion <= norma.porcentajeConstruccionMax;
  const alturaCumple = parcela.plantasConstruidas <= norma.alturaMaximaPlantas;
  const permeableCumple = porcentajePermeable >= norma.porcentajeAreaPermeableMin;

  // Cálculo de Dotación Sanitaria COVENIN
  const habitantes = parcela.numeroHabitantes || 4;
  const dotacionDiaria = habitantes * norma.dotacionLitrosPorHabitanteDia;
  const capacidadTanque = parcela.tanqueSubterraneoLitros || 8000;
  const autonomiaDias = parseFloat((capacidadTanque / (dotacionDiaria || 1)).toFixed(1));
  const cumpleReserva = autonomiaDias >= 2.0; // En Venezuela se exige mín. 2 a 3 días de autonomía de reserva

  const observaciones: string[] = [];

  if (!frenteCumple) {
    observaciones.push(`Invasión en retiro de frente: tiene ${parcela.retiroFrenteM}m, la norma exige mínimo ${norma.retiroFrenteMinM}m.`);
  }
  if (!lateralIzqCumple || !lateralDerCumple) {
    observaciones.push(`Retiro lateral insuficiente: mínimo legal es ${norma.retiroLateralMinM}m.`);
  }
  if (!fondoCumple) {
    observaciones.push(`Infracción en retiro de fondo: tiene ${parcela.retiroFondoM}m, mínimo exigido es ${norma.retiroFondoMinM}m.`);
  }
  if (!ubicacionCumple) {
    observaciones.push(`Exceso de porcentaje de ubicación: ${porcentajeUbicacion.toFixed(1)}% supera el máximo de ${norma.porcentajeUbicacionMax}%.`);
  }
  if (!construccionCumple) {
    observaciones.push(`Exceso de área de construcción: ${porcentajeConstruccion.toFixed(1)}% supera el límite de ${norma.porcentajeConstruccionMax}%.`);
  }
  if (!alturaCumple) {
    observaciones.push(`Altura excede la zonificación: ${parcela.plantasConstruidas} plantas sobre el límite de ${norma.alturaMaximaPlantas}.`);
  }
  if (!permeableCumple) {
    observaciones.push(`Área verde/permeable insuficiente: ${porcentajePermeable.toFixed(1)}% (Mínimo exigido: ${norma.porcentajeAreaPermeableMin}%).`);
  }
  if (!cumpleReserva) {
    observaciones.push(`Capacidad de reserva de agua baja (${autonomiaDias} días). La norma COVENIN recomienda un tanque con autonomía mínima de 3 días para contingencias en Portuguesa.`);
  }

  // Cálculo de puntaje
  const checks = [frenteCumple, lateralIzqCumple, lateralDerCumple, fondoCumple, ubicacionCumple, construccionCumple, alturaCumple, permeableCumple, cumpleReserva];
  const checksAprobados = checks.filter(Boolean).length;
  const puntajeConformidad = Math.round((checksAprobados / checks.length) * 100);

  return {
    cumple: observaciones.length === 0,
    puntajeConformidad,
    retiros: {
      frente: { valor: parcela.retiroFrenteM, minimo: norma.retiroFrenteMinM, cumple: frenteCumple },
      lateralIzq: { valor: parcela.retiroLateralIzqM, minimo: norma.retiroLateralMinM, cumple: lateralIzqCumple },
      lateralDer: { valor: parcela.retiroLateralDerM, minimo: norma.retiroLateralMinM, cumple: lateralDerCumple },
      fondo: { valor: parcela.retiroFondoM, minimo: norma.retiroFondoMinM, cumple: fondoCumple },
    },
    porcentajeUbicacion: { valor: parseFloat(porcentajeUbicacion.toFixed(1)), maximo: norma.porcentajeUbicacionMax, cumple: ubicacionCumple },
    porcentajeConstruccion: { valor: parseFloat(porcentajeConstruccion.toFixed(1)), maximo: norma.porcentajeConstruccionMax, cumple: construccionCumple },
    alturaPlantas: { valor: parcela.plantasConstruidas, maximo: norma.alturaMaximaPlantas, cumple: alturaCumple },
    areaPermeable: { valor: parseFloat(porcentajePermeable.toFixed(1)), minimo: norma.porcentajeAreaPermeableMin, cumple: permeableCumple },
    dotacionAgua: {
      habitantes,
      dotacionDiariaCoveninLitros: dotacionDiaria,
      capacidadTanqueLitros: capacidadTanque,
      autonomiaDias,
      cumpleReserva,
    },
    observaciones,
  };
}
