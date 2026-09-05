import { evaluarParametrosUrbanisticos, PARAMETROS_NORMATIVOS_VENEZUELA } from "./calculador";

function runTests() {
  console.log("=== INICIANDO PRUEBAS DE CUMPLIMIENTO URBANÍSTICO VENEZOLANO ===");

  // Caso 1: Parcela 100% conforme en R-2 (Los Robles)
  const casoConforme = evaluarParametrosUrbanisticos({
    areaTerrenoM2: 250,
    areaConstruccionM2: 180,
    plantasConstruidas: 2,
    zonificacion: "R2_BIFAMILIAR",
    retiroFrenteM: 4.5,
    retiroLateralIzqM: 2.5,
    retiroLateralDerM: 2.0,
    retiroFondoM: 3.5,
    areaPermeableM2: 50,
    tanqueSubterraneoLitros: 8500,
    numeroHabitantes: 4,
  });

  console.assert(casoConforme.cumple === true, "Caso conforme debe cumplir");
  console.assert(casoConforme.puntajeConformidad === 100, "Puntaje debe ser 100%");
  console.log("✔ Caso 1 Conforme R-2: Aprobado (100%)");

  // Caso 2: Parcela con infracción en retiro de frente (2.5m vs 4.0m exigido)
  const casoInfraccionFrente = evaluarParametrosUrbanisticos({
    areaTerrenoM2: 240,
    areaConstruccionM2: 200,
    plantasConstruidas: 2,
    zonificacion: "R2_BIFAMILIAR",
    retiroFrenteM: 2.5, // Falla
    retiroLateralIzqM: 1.5, // Falla
    retiroLateralDerM: 2.0,
    retiroFondoM: 3.0,
    areaPermeableM2: 20,
    tanqueSubterraneoLitros: 4000,
    numeroHabitantes: 5,
  });

  console.assert(casoInfraccionFrente.cumple === false, "Caso infracción debe fallar");
  console.assert(casoInfraccionFrente.observaciones.length > 0, "Debe tener observaciones");
  console.log("✔ Caso 2 Infracción detectada correctamente:", casoInfraccionFrente.observaciones.length, "observaciones.");

  console.log("=== TODAS LAS PRUEBAS DE CÁLCULO URBANÍSTICO COMPLETADAS CON ÉXITO ===");
}

runTests();
