import { format } from 'date-fns';
import { useWebRouter } from '@js-modules/web-react-router';

export function useSearchParamLogDate(): string {
  const { searchParams } = useWebRouter();

  const logDateDate =
    searchParams.get('logDate') ?? format(new Date(), 'yyyy-MM-dd');

  return logDateDate;
}
