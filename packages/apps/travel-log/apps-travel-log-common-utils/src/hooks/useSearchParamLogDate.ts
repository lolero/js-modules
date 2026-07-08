import { format } from 'date-fns';
import { useMemo } from 'react';
import { useWebRouter } from '@js-modules/web-react-router';

export function useSearchParamLogDate(): string {
  const { searchParams } = useWebRouter();

  const logDateDate = useMemo(() => {
    const logDateDateTemp =
      searchParams.get('logDate') ?? format(new Date(), 'yyyy-MM-dd');
    return logDateDateTemp;
  }, [searchParams]);

  return logDateDate;
}
