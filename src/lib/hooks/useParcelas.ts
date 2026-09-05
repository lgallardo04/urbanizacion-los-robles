"use client";

import { useState, useEffect } from 'react';
import { fetchParcelas } from '../data/api';
import { ParcelaUrbanismo } from '../types';
import { PARCELAS_LOS_ROBLES_DATA } from '../data/mock-data';

export function useParcelas() {
  const [parcelas, setParcelas] = useState<ParcelaUrbanismo[]>(PARCELAS_LOS_ROBLES_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchParcelas();
        setParcelas(data);
      } catch (err) {
        console.warn('[useParcelas] Error loading from Supabase, using mock data');
        setError('Usando datos locales');
        setParcelas(PARCELAS_LOS_ROBLES_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { parcelas, isLoading, error };
}
