import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';

export function useSearchParamLogDate(): string {
  const [searchParams] = useSearchParams();

  const logDateDate = useMemo(() => {
    const logDateDateTemp =
      searchParams.get('logDate') ?? format(new Date(), 'yyyy-MM-dd');
    return logDateDateTemp;
  }, [searchParams]);

  return logDateDate;
}
