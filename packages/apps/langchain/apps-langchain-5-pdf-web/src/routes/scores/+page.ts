import { api, getErrorMessage } from '$api';
import type { Scores } from '$s/scores';
import type { PageLoad } from './$types';

export const load = (async (): Promise<
  { scores: Scores; error?: undefined } | { error: string; scores?: undefined }
> => {
  try {
    const { data } = await api.get<Scores>('/scores');

    return {
      scores: data,
    };
  } catch (err) {
    return {
      error: getErrorMessage(err),
    };
  }
}) satisfies PageLoad;
