import { api, getErrorMessage } from '$api';
import type { Document } from '$s/documents';
import type { PageLoad } from './$types';

export const load = (async (): Promise<
  | { documents: Document[]; error?: undefined }
  | { error: string; documents?: undefined }
> => {
  try {
    const { data } = await api.get<Document[]>('/pdfs');
    return {
      documents: data,
    };
  } catch (err) {
    return {
      error: getErrorMessage(err),
    };
  }
}) satisfies PageLoad;
