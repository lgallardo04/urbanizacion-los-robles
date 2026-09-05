"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase/client';
import { SemaforoServicios } from '../types';
import { SEMAFORO_SERVICIOS_LOS_ROBLES } from '../data/mock-data';

export function useRealtimeSemaforo() {
  const [semaforo, setSemaforo] = useState<SemaforoServicios>(SEMAFORO_SERVICIOS_LOS_ROBLES);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadSemaforo = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('SemaforoServicio')
        .select('*')
        .order('"actualizadoEn"', { ascending: false });

      if (error || !data || data.length === 0) return;

      const map: Record<string, any> = {};
      data.forEach((row: any) => {
        if (!map[row.tipo]) map[row.tipo] = { estado: row.estado, ...row.datos };
      });

      setSemaforo(prev => ({
        agua: map['agua'] ?? prev.agua,
        electricidad: map['electricidad'] ?? prev.electricidad,
        gas: map['gas'] ?? prev.gas,
        aseo: map['aseo'] ?? prev.aseo,
        seguridad: map['seguridad'] ?? prev.seguridad,
      }));
      setLastUpdated(new Date());
    } catch (err) {
      console.warn('[useRealtimeSemaforo] falling back to mock data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSemaforo();

    // Subscribe to real-time changes on SemaforoServicio table
    const channel = supabase
      .channel('semaforo-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'SemaforoServicio' },
        () => {
          loadSemaforo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadSemaforo]);

  return { semaforo, isLoading, lastUpdated, refresh: loadSemaforo };
}
