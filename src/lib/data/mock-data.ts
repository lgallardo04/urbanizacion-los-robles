import { ParcelaUrbanismo, SemaforoServicios } from "../types";

export const SEMAFORO_SERVICIOS_LOS_ROBLES: SemaforoServicios = {
  agua: {
    estado: 'OPTIMO',
    origen: 'Pozo Profundo N° 2 + Red Matriz Hidroportuguesa',
    nivelTanqueComunalPorcentaje: 82,
    capacidadTanqueComunalLitros: 180000,
    presionRedPsi: 38,
    proximaDistribucion: 'Servicio Continuo 24/7 (Bomba 15HP Activa)',
  },
  electricidad: {
    estado: 'ESTABLE',
    origen: 'Subestación Araure 115kV / Circuito San José',
    fuente: 'CORPOELEC Troncal 13.8 kV',
    voltajePromedio: 218,
    transformadoresOperativos: 6,
    totalTransformadores: 6,
    frecuenciaHz: 60.0,
  },
  gas: {
    estado: 'AL_DIA',
    proveedor: 'PDVSA Gas Comunal - Planta Acarigua/Araure',
    proximaJornada: 'Viernes 18 de Septiembre 2026',
    cilindrosPendientes: 14,
  },
  aseo: {
    estado: 'ACTIVO',
    empresa: 'Instituto Autónomo de Aseo Urbano Araure',
    diasRecoleccion: 'Martes y Viernes (Turno Matutino 07:00 AM)',
    proximoTurno: 'Viernes 07:00 AM',
  },
  seguridad: {
    portonPrincipal: 'OPERATIVO_AUTOMATICO',
    vigilanciaGarita: true,
    camarasActivas: 16,
    totalCamaras: 16,
  }
};

export const PARCELAS_LOS_ROBLES_DATA: ParcelaUrbanismo[] = [
  {
    id: "parc-c-042",
    numeroParcela: "P-042",
    manzana: "Manzana C",
    calle: "Calle Los Samanes",
    codigoCatastral: "3303-URB-ROBLES-MZA-C-P042",
    propietario: {
      nombre: "Carlos Eduardo Mendoza",
      cedula: "V-14.892.304",
      telefono: "0414-5551234",
      email: "carlos.mendoza@gmail.com"
    },
    areaTerrenoM2: 250.0,
    areaConstruccionM2: 185.0,
    porcentajeUbicacion: 62.0,
    porcentajeConstruccion: 125.0,
    plantasConstruidas: 2,
    zonificacion: "R2_BIFAMILIAR",
    tipoInmueble: "UNIFAMILIAR_AISLADA",
    retiros: {
      frenteM: 4.2,
      lateralIzqM: 2.5,
      lateralDerM: 2.1,
      fondoM: 3.4
    },
    areaPermeableM2: 52.0,
    estatusNormativo: "CONFORME_TOTAL",
    estatusSolvencia: "SOLVENTE",
    servicios: {
      conexionAgua: true,
      tanqueSubterraneoLitros: 8500,
      hidroneumatico: true,
      dotacionDiariaLitros: 1200,
      tensionElectrica: "220V Bifásica",
      capacidadBreakerAmp: 100,
      protectorVoltaje: true,
      gasTipo: "2 Bombonas GLP 43kg",
      aseoAlDia: true,
      internetProveedor: "Fibra Óptica CANTV (100 Mbps)"
    },
    familia: {
      id: "fam-c042",
      codigoFamilia: "FAM-ROBLES-C042",
      apellidoFamilia: "Familia Mendoza Rivas",
      fechaCenso: "2026-06-12",
      censador: "Yoe Tovar (Líder Manzana C)",
      miembros: [
        {
          id: "hab-1",
          cedula: "V-14.892.304",
          nombres: "Carlos Eduardo",
          apellidos: "Mendoza Parra",
          edad: 48,
          sexo: "M",
          parentesco: "JEFE_FAMILIA",
          telefono: "0414-5551234",
          profesion: "Ingeniero Agrónomo",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: [],
          medicamentos: []
        },
        {
          id: "hab-2",
          cedula: "V-16.204.811",
          nombres: "Elena María",
          apellidos: "Rivas de Mendoza",
          edad: 45,
          sexo: "F",
          parentesco: "CONYUGE",
          telefono: "0424-5559876",
          profesion: "Docente Universitaria",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: ["Hipertensión Arterial Grado 1"],
          medicamentos: ["Losartán Potásico 50mg"]
        },
        {
          id: "hab-3",
          cedula: "V-31.450.912",
          nombres: "Sofía Valentina",
          apellidos: "Mendoza Rivas",
          edad: 17,
          sexo: "F",
          parentesco: "HIJO",
          profesion: "Estudiante",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: ["Asma Bronquial"],
          medicamentos: ["Salbutamol Inhalador"]
        },
        {
          id: "hab-4",
          cedula: "V-4.512.980",
          nombres: "Carmen Josefa",
          apellidos: "Rivas de Morales",
          edad: 76,
          sexo: "F",
          parentesco: "ABUELO",
          profesion: "Jubilada",
          embarazada: false,
          discapacidad: false,
          adultoMayor: true,
          patologias: ["Diabetes Mellitus Tipo 2", "Osteoartritis"],
          medicamentos: ["Metformina 850mg", "Glucosamina"]
        }
      ],
      vehiculos: [
        {
          id: "veh-1",
          marca: "Toyota",
          modelo: "Corolla GLi",
          anio: 2014,
          color: "Gris Plomo",
          placa: "AB123CD",
          tagRfid: "RFID-ROBLES-042A"
        },
        {
          id: "veh-2",
          marca: "Chevrolet",
          modelo: "Spark",
          anio: 2011,
          color: "Azul Eléctrico",
          placa: "XY987ZT",
          tagRfid: "RFID-ROBLES-042B"
        }
      ],
      mascotas: [
        {
          id: "mas-1",
          especie: "CANINO",
          nombre: "Rocky",
          raza: "Golden Retriever",
          vacunadoAntirrabica: true
        }
      ]
    }
  },
  {
    id: "parc-a-015",
    numeroParcela: "P-015",
    manzana: "Manzana A",
    calle: "Avenida Principal Los Robles",
    codigoCatastral: "3303-URB-ROBLES-MZA-A-P015",
    propietario: {
      nombre: "Luis Alejandro Gallardo",
      cedula: "V-20.123.456",
      telefono: "0412-7890123",
      email: "luis.gallardo@outlook.com"
    },
    areaTerrenoM2: 280.0,
    areaConstruccionM2: 210.0,
    porcentajeUbicacion: 60.0,
    porcentajeConstruccion: 110.0,
    plantasConstruidas: 2,
    zonificacion: "R2_BIFAMILIAR",
    tipoInmueble: "UNIFAMILIAR_AISLADA",
    retiros: {
      frenteM: 4.5,
      lateralIzqM: 2.8,
      lateralDerM: 2.2,
      fondoM: 4.0
    },
    areaPermeableM2: 65.0,
    estatusNormativo: "CONFORME_TOTAL",
    estatusSolvencia: "SOLVENTE",
    servicios: {
      conexionAgua: true,
      tanqueSubterraneoLitros: 10000,
      hidroneumatico: true,
      dotacionDiariaLitros: 1000,
      tensionElectrica: "220V Trifásica",
      capacidadBreakerAmp: 125,
      protectorVoltaje: true,
      gasTipo: "2 Bombonas GLP 43kg",
      aseoAlDia: true,
      internetProveedor: "Fibra Óptica (200 Mbps)"
    },
    familia: {
      id: "fam-a015",
      codigoFamilia: "FAM-ROBLES-A015",
      apellidoFamilia: "Familia Gallardo",
      fechaCenso: "2026-05-18",
      censador: "Nelson Torrealba (Líder Manzana A)",
      miembros: [
        {
          id: "hab-5",
          cedula: "V-20.123.456",
          nombres: "Luis Alejandro",
          apellidos: "Gallardo",
          edad: 26,
          sexo: "M",
          parentesco: "JEFE_FAMILIA",
          telefono: "0412-7890123",
          profesion: "Licenciado en Informática / Sistemas",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: [],
          medicamentos: []
        },
        {
          id: "hab-6",
          cedula: "V-22.987.654",
          nombres: "Daniela Carolina",
          apellidos: "Pérez de Gallardo",
          edad: 25,
          sexo: "F",
          parentesco: "CONYUGE",
          profesion: "Arquitecto Urbanista",
          embarazada: true,
          discapacidad: false,
          adultoMayor: false,
          patologias: ["Control Prenatal Normal"],
          medicamentos: ["Ácido Fólico", "Calcio con Vitamina D"]
        }
      ],
      vehiculos: [
        {
          id: "veh-3",
          marca: "Ford",
          modelo: "Fiesta Titanium",
          anio: 2016,
          color: "Blanco Perla",
          placa: "AF456GH",
          tagRfid: "RFID-ROBLES-015A"
        }
      ],
      mascotas: [
        {
          id: "mas-2",
          especie: "FELINO",
          nombre: "Misi",
          raza: "Angora Mestizo",
          vacunadoAntirrabica: true
        }
      ]
    }
  },
  {
    id: "parc-b-028",
    numeroParcela: "P-028",
    manzana: "Manzana B",
    calle: "Calle Los Bucares",
    codigoCatastral: "3303-URB-ROBLES-MZA-B-P028",
    propietario: {
      nombre: "Arnando José Jiménez",
      cedula: "V-11.345.678",
      telefono: "0416-6543210",
      email: "arnando.jimenez@iutepi.edu.ve"
    },
    areaTerrenoM2: 260.0,
    areaConstruccionM2: 195.0,
    porcentajeUbicacion: 64.0,
    porcentajeConstruccion: 130.0,
    plantasConstruidas: 2,
    zonificacion: "R2_BIFAMILIAR",
    tipoInmueble: "UNIFAMILIAR_AISLADA",
    retiros: {
      frenteM: 4.0,
      lateralIzqM: 2.2,
      lateralDerM: 2.0,
      fondoM: 3.1
    },
    areaPermeableM2: 48.0,
    estatusNormativo: "CONFORME_TOTAL",
    estatusSolvencia: "SOLVENTE",
    servicios: {
      conexionAgua: true,
      tanqueSubterraneoLitros: 9000,
      hidroneumatico: true,
      dotacionDiariaLitros: 1000,
      tensionElectrica: "220V Bifásica",
      capacidadBreakerAmp: 100,
      protectorVoltaje: true,
      gasTipo: "2 Bombonas GLP 43kg",
      aseoAlDia: true,
      internetProveedor: "Fibra Óptica (150 Mbps)"
    },
    familia: {
      id: "fam-b028",
      codigoFamilia: "FAM-ROBLES-B028",
      apellidoFamilia: "Familia Jiménez Silva",
      fechaCenso: "2026-06-01",
      censador: "Nelson Torrealba",
      miembros: [
        {
          id: "hab-7",
          cedula: "V-11.345.678",
          nombres: "Arnando José",
          apellidos: "Jiménez Silva",
          edad: 54,
          sexo: "M",
          parentesco: "JEFE_FAMILIA",
          telefono: "0416-6543210",
          profesion: "Ingeniero de Sistemas / Docente",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: ["Hipertensión Arterial"],
          medicamentos: ["Enalapril 20mg"]
        },
        {
          id: "hab-8",
          cedula: "V-12.876.543",
          nombres: "Maritza",
          apellidos: "de Jiménez",
          edad: 52,
          sexo: "F",
          parentesco: "CONYUGE",
          profesion: "Administradora",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: [],
          medicamentos: []
        }
      ],
      vehiculos: [
        {
          id: "veh-4",
          marca: "Mitsubishi",
          modelo: "Lancer Touring",
          anio: 2013,
          color: "Gris Plata",
          placa: "AB987CD",
          tagRfid: "RFID-ROBLES-028A"
        }
      ],
      mascotas: []
    }
  },
  {
    id: "parc-d-064",
    numeroParcela: "P-064",
    manzana: "Manzana D",
    calle: "Calle Los Cedros",
    codigoCatastral: "3303-URB-ROBLES-MZA-D-P064",
    propietario: {
      nombre: "Roberto Sánchez",
      cedula: "V-18.765.432",
      telefono: "0424-5123456",
      email: "roberto.sanchez@gmail.com"
    },
    areaTerrenoM2: 240.0,
    areaConstruccionM2: 215.0,
    porcentajeUbicacion: 74.0, // Exceso leve
    porcentajeConstruccion: 145.0,
    plantasConstruidas: 2,
    zonificacion: "R2_BIFAMILIAR",
    tipoInmueble: "UNIFAMILIAR_AISLADA",
    retiros: {
      frenteM: 2.8, // Invasión (exige 4m)
      lateralIzqM: 1.2, // Invasión (exige 2m)
      lateralDerM: 2.0,
      fondoM: 2.5
    },
    areaPermeableM2: 22.0,
    estatusNormativo: "INFRACCION_RETIROS",
    estatusSolvencia: "PENDIENTE_MES_ACTUAL",
    servicios: {
      conexionAgua: true,
      tanqueSubterraneoLitros: 4000,
      hidroneumatico: false,
      dotacionDiariaLitros: 1250,
      tensionElectrica: "110V",
      capacidadBreakerAmp: 60,
      protectorVoltaje: false,
      gasTipo: "1 Bombona GLP 10kg",
      aseoAlDia: false,
      internetProveedor: "Sin internet fijo"
    },
    familia: {
      id: "fam-d064",
      codigoFamilia: "FAM-ROBLES-D064",
      apellidoFamilia: "Familia Sánchez Medina",
      fechaCenso: "2026-07-10",
      censador: "Yoe Tovar",
      miembros: [
        {
          id: "hab-9",
          cedula: "V-18.765.432",
          nombres: "Roberto",
          apellidos: "Sánchez",
          edad: 39,
          sexo: "M",
          parentesco: "JEFE_FAMILIA",
          profesion: "Comerciante",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: [],
          medicamentos: []
        },
        {
          id: "hab-10",
          cedula: "V-19.876.543",
          nombres: "Mariana",
          apellidos: "Medina",
          edad: 36,
          sexo: "F",
          parentesco: "CONYUGE",
          profesion: "Repostera",
          embarazada: false,
          discapacidad: false,
          adultoMayor: false,
          patologias: [],
          medicamentos: []
        },
        {
          id: "hab-11",
          cedula: "V-32.111.222",
          nombres: "Gabriel",
          apellidos: "Sánchez Medina",
          edad: 12,
          sexo: "M",
          parentesco: "HIJO",
          profesion: "Estudiante",
          embarazada: false,
          discapacidad: true,
          tipoDiscapacidad: "Motora Leve",
          adultoMayor: false,
          patologias: ["Rehabilitación Fisioterapéutica"],
          medicamentos: []
        }
      ],
      vehiculos: [
        {
          id: "veh-5",
          marca: "Hyundai",
          modelo: "Accent",
          anio: 2006,
          color: "Rojo",
          placa: "AA789KK",
          tagRfid: "RFID-ROBLES-064A"
        }
      ],
      mascotas: [
        {
          id: "mas-3",
          especie: "CANINO",
          nombre: "Boby",
          raza: "Poodle",
          vacunadoAntirrabica: false // Alerta sanitaria
        }
      ]
    }
  },
  {
    id: "parc-e-088",
    numeroParcela: "P-088",
    manzana: "Manzana E",
    calle: "Calle Los Araguaneyes",
    codigoCatastral: "3303-URB-ROBLES-MZA-E-P088",
    propietario: {
      nombre: "Dra. Gladys Coromoto Briceño",
      cedula: "V-8.765.432",
      telefono: "0414-5234567",
      email: "gladys.briceno@medicos.ve"
    },
    areaTerrenoM2: 250.0,
    areaConstruccionM2: 170.0,
    porcentajeUbicacion: 58.0,
    porcentajeConstruccion: 110.0,
    plantasConstruidas: 1,
    zonificacion: "R2_BIFAMILIAR",
    tipoInmueble: "UNIFAMILIAR_AISLADA",
    retiros: {
      frenteM: 4.8,
      lateralIzqM: 2.6,
      lateralDerM: 2.5,
      fondoM: 4.2
    },
    areaPermeableM2: 70.0,
    estatusNormativo: "CONFORME_TOTAL",
    estatusSolvencia: "SOLVENTE",
    servicios: {
      conexionAgua: true,
      tanqueSubterraneoLitros: 12000,
      hidroneumatico: true,
      dotacionDiariaLitros: 800,
      tensionElectrica: "220V Bifásica",
      capacidadBreakerAmp: 100,
      protectorVoltaje: true,
      gasTipo: "2 Bombonas GLP 43kg",
      aseoAlDia: true,
      internetProveedor: "Fibra Óptica (200 Mbps)"
    },
    familia: {
      id: "fam-e088",
      codigoFamilia: "FAM-ROBLES-E088",
      apellidoFamilia: "Familia Briceño",
      fechaCenso: "2026-06-20",
      censador: "Nelson Torrealba",
      miembros: [
        {
          id: "hab-12",
          cedula: "V-8.765.432",
          nombres: "Gladys Coromoto",
          apellidos: "Briceño",
          edad: 68,
          sexo: "F",
          parentesco: "JEFE_FAMILIA",
          telefono: "0414-5234567",
          profesion: "Médico Pediatra Jubilada",
          embarazada: false,
          discapacidad: false,
          adultoMayor: true,
          patologias: ["Hipertensión Arterial"],
          medicamentos: ["Amlodipina 10mg"]
        }
      ],
      vehiculos: [
        {
          id: "veh-6",
          marca: "Toyota",
          modelo: "Yaris",
          anio: 2018,
          color: "Plateado",
          placa: "AE456PP",
          tagRfid: "RFID-ROBLES-088A"
        }
      ],
      mascotas: []
    }
  }
];

export const ESTADISTICAS_URBANISMO_ROBLES = {
  totalParcelas: 350,
  parcelasCensadas: 320,
  porcentajeCenso: 91.4,
  poblacionTotalHabitantes: 1280,
  totalFamilias: 320,
  promedioHabitantesPorVivienda: 4.0,
  distribucionEdad: {
    ninos0_12: 245,
    adolescentes13_17: 185,
    adultos18_59: 680,
    adultosMayores60Mas: 170
  },
  saludComunitaria: {
    totalCasosHipertension: 142,
    totalCasosDiabetes: 86,
    totalCasosAsma: 64,
    embarazadas: 12,
    personasConDiscapacidad: 19,
    medicamentosMasRequeridos: [
      { medicamento: "Losartán Potásico 50mg", cantidadMensual: 180 },
      { medicamento: "Metformina 850mg", cantidadMensual: 110 },
      { medicamento: "Amlodipina 10mg", cantidadMensual: 95 },
      { medicamento: "Enalapril 20mg", cantidadMensual: 75 },
      { medicamento: "Salbutamol Inhalador", cantidadMensual: 64 },
    ]
  },
  conformidadUrbanistica: {
    conformesTotal: 288,
    observacionesMenores: 22,
    infraccionRetiros: 8,
    infraccionUsoSuelo: 2,
    porcentajeConformidad: 90.0
  },
  condominio: {
    solvenciaPorcentaje: 88.5,
    fondosReservaUsd: 4850.0,
    moraTotalUsd: 625.0,
    cuotaMensualUsd: 25.0
  }
};
