import { api, getErrorMessage } from '$api';
import type { Document } from '$s/documents';
import type { PageLoad } from './$types';

export const load = (async () => {
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
