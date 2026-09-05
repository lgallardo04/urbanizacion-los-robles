export type RolUsuario = 'ADMIN_GENERAL' | 'COMITE_URBANISMO' | 'JEFE_MANZANA' | 'PROPIETARIO' | 'VECINO';

export type TipoInmueble = 
  | 'UNIFAMILIAR_AISLADA'
  | 'UNIFAMILIAR_PAREADA'
  | 'BIFAMILIAR'
  | 'MULTIFAMILIAR'
  | 'COMERCIAL_VECINAL';

export type Zonificacion = 
  | 'R1_UNIFAMILIAR'
  | 'R2_BIFAMILIAR'
  | 'R3_MULTIFAMILIAR'
  | 'C1_COMERCIAL_LOCAL'
  | 'AV_AREA_VERDE_RECREATIVA';

export type EstatusNormativo = 
  | 'CONFORME_TOTAL'
  | 'OBSERVACION_MENOR'
  | 'EN_TRAMITE_REMODELACION'
  | 'INFRACCION_RETIROS'
  | 'INFRACCION_USO_SUELO';

export type EstatusSolvencia = 
  | 'SOLVENTE'
  | 'PENDIENTE_MES_ACTUAL'
  | 'EN_MORA'
  | 'EXONERADO';

export interface ParcelaUrbanismo {
  id: string;
  numeroParcela: string;
  manzana: string;
  calle: string;
  codigoCatastral: string;
  propietario: {
    nombre: string;
    cedula: string;
    telefono: string;
    email: string;
  };
  areaTerrenoM2: number;
  areaConstruccionM2: number;
  porcentajeUbicacion: number;
  porcentajeConstruccion: number;
  plantasConstruidas: number;
  zonificacion: Zonificacion;
  tipoInmueble: TipoInmueble;
  retiros: {
    frenteM: number;
    lateralIzqM: number;
    lateralDerM: number;
    fondoM: number;
  };
  areaPermeableM2: number;
  estatusNormativo: EstatusNormativo;
  estatusSolvencia: EstatusSolvencia;
  servicios: {
    conexionAgua: boolean;
    tanqueSubterraneoLitros: number;
    hidroneumatico: boolean;
    dotacionDiariaLitros: number;
    tensionElectrica: '110V' | '220V Bifásica' | '220V Trifásica';
    capacidadBreakerAmp: number;
    protectorVoltaje: boolean;
    gasTipo: string;
    aseoAlDia: boolean;
    internetProveedor: string;
  };
  familia?: FamiliaCenso;
}

export interface Habitante {
  id: string;
  cedula: string;
  nombres: string;
  apellidos: string;
  edad: number;
  sexo: 'M' | 'F';
  parentesco: 'JEFE_FAMILIA' | 'CONYUGE' | 'HIJO' | 'PADRE' | 'ABUELO' | 'OTRO';
  telefono?: string;
  profesion?: string;
  embarazada: boolean;
  discapacidad: boolean;
  tipoDiscapacidad?: string;
  adultoMayor: boolean;
  patologias: string[];
  medicamentos: string[];
}

export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  color: string;
  placa: string;
  tagRfid: string;
}

export interface Mascota {
  id: string;
  especie: 'CANINO' | 'FELINO';
  nombre: string;
  raza: string;
  vacunadoAntirrabica: boolean;
}

export interface FamiliaCenso {
  id: string;
  codigoFamilia: string;
  apellidoFamilia: string;
  fechaCenso: string;
  censador: string;
  miembros: Habitante[];
  vehiculos: Vehiculo[];
  mascotas: Mascota[];
}

export interface SemaforoServicios {
  agua: {
    estado: 'OPTIMO' | 'MANTENIMIENTO' | 'CRITICO';
    origen: string;
    nivelTanqueComunalPorcentaje: number;
    capacidadTanqueComunalLitros: number;
    presionRedPsi: number;
    proximaDistribucion: string;
  };
  electricidad: {
    estado: 'ESTABLE' | 'ALERTA_VOLTAJE' | 'CORTE_PROGRAMADO';
    origen?: string;
    fuente: string;
    voltajePromedio: number;
    transformadoresOperativos: number;
    totalTransformadores: number;
    frecuenciaHz: number;
  };
  gas: {
    estado: 'AL_DIA' | 'SOLICITUD_ABIERTA' | 'EN_DISTRIBUCION';
    proveedor: string;
    proximaJornada: string;
    cilindrosPendientes: number;
  };
  aseo: {
    estado: 'ACTIVO';
    empresa: string;
    diasRecoleccion: string;
    proximoTurno: string;
  };
  seguridad: {
    portonPrincipal: 'OPERATIVO_AUTOMATICO' | 'MANUAL';
    vigilanciaGarita: boolean;
    camarasActivas: number;
    totalCamaras: number;
  };
}

export interface EvaluacionNormativaResultado {
  cumple: boolean;
  puntajeConformidad: number;
  retiros: {
    frente: { valor: number; minimo: number; cumple: boolean };
    lateralIzq: { valor: number; minimo: number; cumple: boolean };
    lateralDer: { valor: number; minimo: number; cumple: boolean };
    fondo: { valor: number; minimo: number; cumple: boolean };
  };
  porcentajeUbicacion: { valor: number; maximo: number; cumple: boolean };
  porcentajeConstruccion: { valor: number; maximo: number; cumple: boolean };
  alturaPlantas: { valor: number; maximo: number; cumple: boolean };
  areaPermeable: { valor: number; minimo: number; cumple: boolean };
  dotacionAgua: {
    habitantes: number;
    dotacionDiariaCoveninLitros: number;
    capacidadTanqueLitros: number;
    autonomiaDias: number;
    cumpleReserva: boolean;
  };
  observaciones: string[];
}

export interface IncidenciaServicio {
  id: string;
  tipo: 'AGUA' | 'ELECTRICIDAD' | 'GAS' | 'ASEO' | 'SEGURIDAD' | 'VIALIDAD';
  titulo: string;
  descripcion: string;
  manzana: string;
  numeroParcela?: string;
  estatus: 'PENDIENTE' | 'EN_PROCESO' | 'RESUELTO';
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  reportadoPor: string;
  createdAt: string;
  resueltoEn?: string;
}

export interface RegistroAcceso {
  id: string;
  placa: string;
  tipo: 'RESIDENTE' | 'VISITANTE' | 'DELIVERY' | 'SERVICIO';
  tagRfid?: string | null;
  nombreConductor: string;
  cedulaConductor?: string | null;
  parcelaDestino: string;
  fechaIngreso: string;
  fechaSalida?: string | null;
  estatus: 'DENTRO' | 'SALIO';
}

export interface ComunicadoComunal {
  id: string;
  titulo: string;
  contenido: string;
  categoria: 'AGUA' | 'ELECTRICIDAD' | 'ASAMBLEA' | 'INFORMATIVO' | 'URGENTE';
  prioridad: 'NORMAL' | 'ALTA' | 'URGENTE';
  emisor: string;
  fechaPublicacion: string;
  activo: boolean;
}
