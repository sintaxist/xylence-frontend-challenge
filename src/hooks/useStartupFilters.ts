import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchStartups } from '@/api/mock';
import { StartupFilters, Stage, Sector, Country } from '@/types';

export function useStartupFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters: StartupFilters = useMemo(() => ({
    search: searchParams.get('search') || '',
    sectors: searchParams.getAll('sectors') as Sector[],
    stages: searchParams.getAll('stages') as Stage[],
    countries: searchParams.getAll('countries') as Country[],
    sortBy: (searchParams.get('sortBy') as StartupFilters['sortBy']) || undefined,
    sortOrder: (searchParams.get('sortOrder') as StartupFilters['sortOrder']) || undefined,
  }), [searchParams]);

  const [filters, setFilters] = useState<StartupFilters>(initialFilters);

  const { data: startups = [], isLoading } = useQuery({
    queryKey: ['startups', filters],
    queryFn: () => fetchStartups(filters),
    staleTime: 1000 * 60 * 5,
  });

  const updateFilters = useCallback((newFilters: Partial<StartupFilters>) => {
    setFilters((prev) => {
      const updated: StartupFilters = {
        ...prev,
        ...newFilters,
      };
      
      const params = new URLSearchParams();
      
      if (updated.search) params.set('search', updated.search);
      
      (updated.sectors || []).forEach(s => params.append('sectors', s));
      (updated.stages || []).forEach(s => params.append('stages', s));
      (updated.countries || []).forEach(c => params.append('countries', c));

      if (updated.sortBy) {
        params.set('sortBy', updated.sortBy);
      }
      
      if (updated.sortOrder) {
        params.set('sortOrder', updated.sortOrder);
      }
      
      setSearchParams(params);
      return updated;
    });
  }, [setSearchParams]);

  return {
    filters,
    updateFilters,
    startups,
    isLoading,
    totalResults: startups.length
  };
}