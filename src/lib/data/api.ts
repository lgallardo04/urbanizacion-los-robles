import { supabase } from '../supabase/client';
import { ParcelaUrbanismo, SemaforoServicios, IncidenciaServicio, RegistroAcceso, ComunicadoComunal } from '../types';
import { 
  PARCELAS_LOS_ROBLES_DATA, 
  SEMAFORO_SERVICIOS_LOS_ROBLES 
} from '../data/mock-data';

// ─── Parcelas ───────────────────────────────────────────────────────────────

export async function fetchParcelas(): Promise<ParcelaUrbanismo[]> {
  try {
    const { data, error } = await supabase
      .from('Parcela')
      .select(`
        *,
        Manzana(id, nombre, codigo),
        Familia(
          id, codigoFamilia, apellidoFamilia, fechaCenso, censadorResponsable,
          Habitante(id, nombres, apellidos, cedula, parentesco, sexo, adultoMayor, discapacidad, embarazada)
        ),
        ServiciosVivienda(*)
      `)
      .order('"numeroParcela"');

    if (error || !data || data.length === 0) {
      return PARCELAS_LOS_ROBLES_DATA;
    }

    return data.map((row: any): ParcelaUrbanismo => ({
      id: row.id,
      numeroParcela: row.numeroParcela,
      manzana: row.Manzana?.nombre ?? 'Sin manzana',
      calle: row.calle,
      codigoCatastral: row.codigoCatastral,
      areaTerrenoM2: row.areaTerrenoM2,
      areaConstruccionM2: row.areaConstruccionM2,
      porcentajeUbicacion: row.porcentajeUbicacion,
      porcentajeConstruccion: row.porcentajeConstrucc,
      plantasConstruidas: row.plantasConstruidas,
      zonificacion: row.zonificacion,
      tipoInmueble: row.tipoInmueble,
      retiros: {
        frenteM: row.retiroFrenteM,
        lateralIzqM: row.retiroLateralIzqM,
        lateralDerM: row.retiroLateralDerM,
        fondoM: row.retiroFondoM,
      },
      areaPermeableM2: row.areaPermeableM2,
      estatusNormativo: row.estatusNormativo,
      estatusSolvencia: row.estatusSolvencia,
      propietario: {
        nombre: row.Familia?.[0]?.apellidoFamilia ?? 'Sin registro',
        cedula: row.Familia?.[0]?.Habitante?.find((h: any) => h.parentesco === 'JEFE_FAMILIA')?.cedula ?? 'N/A',
        telefono: '',
        email: '',
      },
      familia: row.Familia?.[0] ? {
        id: row.Familia[0].id,
        codigoFamilia: row.Familia[0].codigoFamilia,
        apellidoFamilia: row.Familia[0].apellidoFamilia,
        fechaCenso: row.Familia[0].fechaCenso ?? new Date().toISOString(),
        censador: row.Familia[0].censadorResponsable ?? 'Sin registro',
        miembros: (row.Familia[0].Habitante ?? []).map((h: any) => ({
          id: h.id,
          nombres: h.nombres,
          apellidos: h.apellidos,
          cedula: h.cedula,
          edad: 0,
          sexo: h.sexo ?? 'M',
          parentesco: h.parentesco,
          adultoMayor: h.adultoMayor,
          discapacidad: h.discapacidad,
          embarazada: h.embarazada,
          patologias: [],
          medicamentos: [],
        })),
        vehiculos: [],
        mascotas: [],
      } : undefined,
      servicios: {
        conexionAgua: row.ServiciosVivienda?.[0]?.conexionRedAcueducto ?? true,
        tanqueSubterraneoLitros: row.ServiciosVivienda?.[0]?.capacidadTanqueLitros ?? 5000,
        hidroneumatico: row.ServiciosVivienda?.[0]?.sistemaHidroneumatico ?? false,
        dotacionDiariaLitros: row.ServiciosVivienda?.[0]?.dotacionDiariaCalculada ?? 1200,
        tensionElectrica: '220V Bifásica' as const,
        capacidadBreakerAmp: row.ServiciosVivienda?.[0]?.capacidadBreakerAmp ?? 100,
        protectorVoltaje: row.ServiciosVivienda?.[0]?.tieneProtectorVoltaje ?? true,
        gasTipo: row.ServiciosVivienda?.[0]?.tipoServicioGas ?? 'BOMBONA_GLP_43KG',
        aseoAlDia: row.ServiciosVivienda?.[0]?.pagoAseoAlDia ?? true,
        internetProveedor: row.ServiciosVivienda?.[0]?.proveedorInternet ?? 'CANTV',
      },
    }));
  } catch (err) {
    console.warn('[fetchParcelas] Using mock data:', err);
    return PARCELAS_LOS_ROBLES_DATA;
  }
}

// ─── Semáforo de Servicios ───────────────────────────────────────────────────

export async function fetchSemaforo(): Promise<SemaforoServicios> {
  try {
    const { data, error } = await supabase
      .from('SemaforoServicio')
      .select('*')
      .order('"actualizadoEn"', { ascending: false });

    if (error || !data || data.length === 0) {
      return SEMAFORO_SERVICIOS_LOS_ROBLES;
    }

    const map: Record<string, any> = {};
    data.forEach((row: any) => {
      if (!map[row.tipo]) map[row.tipo] = { estado: row.estado, ...row.datos };
    });

    return {
      agua: map['agua'] ?? SEMAFORO_SERVICIOS_LOS_ROBLES.agua,
      electricidad: map['electricidad'] ?? SEMAFORO_SERVICIOS_LOS_ROBLES.electricidad,
      gas: map['gas'] ?? SEMAFORO_SERVICIOS_LOS_ROBLES.gas,
      aseo: map['aseo'] ?? SEMAFORO_SERVICIOS_LOS_ROBLES.aseo,
      seguridad: map['seguridad'] ?? SEMAFORO_SERVICIOS_LOS_ROBLES.seguridad,
    };
  } catch (err) {
    console.warn('[fetchSemaforo] Using mock data:', err);
    return SEMAFORO_SERVICIOS_LOS_ROBLES;
  }
}

// ─── Incidencias de Servicios ────────────────────────────────────────────────

export const MOCK_INCIDENCIAS: IncidenciaServicio[] = [
  {
    id: 'inc-001',
    tipo: 'AGUA',
    titulo: 'Fuga menor en llave de paso principal',
    descripcion: 'Goteo constante en la acometida de acera frente a la parcela P-042.',
    manzana: 'Manzana C',
    numeroParcela: 'P-042',
    estatus: 'EN_PROCESO',
    prioridad: 'MEDIA',
    reportadoPor: 'Carlos Mendoza',
    createdAt: '2026-08-28T14:30:00Z',
  },
  {
    id: 'inc-002',
    tipo: 'ELECTRICIDAD',
    titulo: 'Zumbido en transformador TX-ROBLES-02',
    descripcion: 'Se escucha ruido persistente y parpadeo de luminarias en horario nocturno.',
    manzana: 'Manzana B',
    numeroParcela: 'P-019',
    estatus: 'PENDIENTE',
    prioridad: 'ALTA',
    reportadoPor: 'José Pérez',
    createdAt: '2026-08-29T09:15:00Z',
  },
  {
    id: 'inc-003',
    tipo: 'ASEO',
    titulo: 'Ramas de poda acumuladas en esquina',
    descripcion: 'Restos de poda dejados en la isla central requieren recolección especial.',
    manzana: 'Manzana A',
    numeroParcela: 'P-007',
    estatus: 'RESUELTO',
    prioridad: 'BAJA',
    reportadoPor: 'Pedro Torrealba',
    createdAt: '2026-08-27T11:00:00Z',
  },
  {
    id: 'inc-004',
    tipo: 'GAS',
    titulo: 'Solicitud de sustitución de cilindro 43kg con válvula vencida',
    descripcion: 'Cilindro con desgaste en conector de gas para cambio en la próxima jornada.',
    manzana: 'Manzana D',
    numeroParcela: 'P-055',
    estatus: 'PENDIENTE',
    prioridad: 'MEDIA',
    reportadoPor: 'Familia García',
    createdAt: '2026-08-29T16:20:00Z',
  }
];

export async function fetchIncidencias(): Promise<IncidenciaServicio[]> {
  try {
    const { data, error } = await supabase
      .from('IncidenciaServicio')
      .select('*')
      .order('"createdAt"', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_INCIDENCIAS;
    }

    return data.map((d: any) => ({
      id: d.id,
      tipo: d.tipo,
      titulo: d.titulo,
      descripcion: d.descripcion,
      manzana: d.manzana,
      numeroParcela: d.numeroParcela,
      estatus: d.estatus,
      prioridad: d.prioridad,
      reportadoPor: d.reportadoPor,
      createdAt: d.createdAt,
      resueltoEn: d.resueltoEn,
    }));
  } catch {
    return MOCK_INCIDENCIAS;
  }
}

export async function createIncidencia(incidencia: Omit<IncidenciaServicio, 'id' | 'createdAt'>): Promise<boolean> {
  try {
    const { error } = await (supabase as any).from('IncidenciaServicio').insert([{
      tipo: incidencia.tipo,
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      manzana: incidencia.manzana,
      numeroParcela: incidencia.numeroParcela,
      estatus: incidencia.estatus || 'PENDIENTE',
      prioridad: incidencia.prioridad || 'MEDIA',
      reportadoPor: incidencia.reportadoPor,
    }]);

    return !error;
  } catch {
    return false;
  }
}

// ─── Registro de Acceso & Garita ─────────────────────────────────────────────

export const MOCK_ACCESOS: RegistroAcceso[] = [
  {
    id: 'acc-001',
    placa: 'AB123CD',
    tipo: 'RESIDENTE',
    tagRfid: 'RFID-ROBLES-042A',
    nombreConductor: 'Carlos Eduardo Mendoza',
    cedulaConductor: 'V-14.892.304',
    parcelaDestino: 'P-042 (Manzana C)',
    fechaIngreso: '2026-08-30T00:15:00Z',
    estatus: 'DENTRO',
  },
  {
    id: 'acc-002',
    placa: 'XY987ZT',
    tipo: 'VISITANTE',
    tagRfid: null,
    nombreConductor: 'Dr. Roberto Escalona',
    cedulaConductor: 'V-11.450.982',
    parcelaDestino: 'P-007 (Manzana A)',
    fechaIngreso: '2026-08-29T23:40:00Z',
    estatus: 'DENTRO',
  },
  {
    id: 'acc-003',
    placa: 'DEL-451',
    tipo: 'DELIVERY',
    tagRfid: null,
    nombreConductor: 'Repartidor PedidosYa',
    cedulaConductor: 'V-29.340.112',
    parcelaDestino: 'P-019 (Manzana B)',
    fechaIngreso: '2026-08-29T22:10:00Z',
    fechaSalida: '2026-08-29T22:25:00Z',
    estatus: 'SALIO',
  }
];

export async function fetchAccesos(): Promise<RegistroAcceso[]> {
  try {
    const { data, error } = await (supabase as any)
      .from('RegistroAcceso')
      .select('*')
      .order('fechaIngreso', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_ACCESOS;
    }

    return data.map((d: any) => ({
      id: d.id,
      placa: d.placa,
      tipo: d.tipo,
      tagRfid: d.tagRfid,
      nombreConductor: d.nombreConductor,
      cedulaConductor: d.cedulaConductor,
      parcelaDestino: d.parcelaDestino,
      fechaIngreso: d.fechaIngreso,
      fechaSalida: d.fechaSalida,
      estatus: d.estatus,
    }));
  } catch {
    return MOCK_ACCESOS;
  }
}

export async function createAcceso(acceso: Omit<RegistroAcceso, 'id' | 'fechaIngreso'>): Promise<boolean> {
  try {
    const { error } = await (supabase as any).from('RegistroAcceso').insert([{
      placa: acceso.placa.toUpperCase(),
      tipo: acceso.tipo,
      tagRfid: acceso.tagRfid,
      nombreConductor: acceso.nombreConductor,
      cedulaConductor: acceso.cedulaConductor,
      parcelaDestino: acceso.parcelaDestino,
      estatus: acceso.estatus || 'DENTRO',
    }]);

    return !error;
  } catch {
    return false;
  }
}

export async function marcarSalidaAcceso(id: string): Promise<boolean> {
  try {
    const { error } = await (supabase as any)
      .from('RegistroAcceso')
      .update({
        estatus: 'SALIO',
        fechaSalida: new Date().toISOString(),
      })
      .eq('id', id);

    return !error;
  } catch {
    return false;
  }
}

// ─── Comunicados Comunales ───────────────────────────────────────────────────

export const MOCK_COMUNICADOS: ComunicadoComunal[] = [
  {
    id: 'com-001',
    titulo: '💧 Mantenimiento Preventivo de Bomba en Pozo N°2',
    contenido: 'Se informa a la comunidad que el próximo jueves se realizará mantenimiento al motor de 15HP. Se mantendrá el suministro con el tanque comunal (180.000 L).',
    categoria: 'AGUA',
    prioridad: 'ALTA',
    emisor: 'Comité de Servicios Públicos',
    fechaPublicacion: '2026-08-29T10:00:00Z',
    activo: true,
  },
  {
    id: 'com-002',
    titulo: '⚡ Jornada de Mantenimiento de Poda y Líneas CORPOELEC',
    contenido: 'Cuadrillas de CORPOELEC realizarán corte de ramas sobre tendido de 13.8kV el sábado de 8:00 AM a 12:00 PM sin interrupción general.',
    categoria: 'ELECTRICIDAD',
    prioridad: 'NORMAL',
    emisor: 'Mesa Técnica de Energía',
    fechaPublicacion: '2026-08-28T16:00:00Z',
    activo: true,
  },
  {
    id: 'com-003',
    titulo: '📑 Convocatoria a Asamblea General Extraordinaria',
    contenido: 'Convocatoria para el domingo 15 de Septiembre a las 5:00 PM en la Cancha de Usos Múltiples. Puntos a tratar: Presupuesto de pintura perimetral y portón.',
    categoria: 'ASAMBLEA',
    prioridad: 'URGENTE',
    emisor: 'Junta de Condominio ASOVECINOS',
    fechaPublicacion: '2026-08-27T08:00:00Z',
    activo: true,
  }
];

export async function fetchComunicados(): Promise<ComunicadoComunal[]> {
  try {
    const { data, error } = await supabase
      .from('ComunicadoComunal')
      .select('*')
      .order('"fechaPublicacion"', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_COMUNICADOS;
    }

    return data.map((d: any) => ({
      id: d.id,
      titulo: d.titulo,
      contenido: d.contenido,
      categoria: d.categoria,
      prioridad: d.prioridad,
      emisor: d.emisor,
      fechaPublicacion: d.fechaPublicacion,
      activo: d.activo,
    }));
  } catch {
    return MOCK_COMUNICADOS;
  }
}
