import { api, getErrorMessage } from '$api';
import type { PageLoad } from './$types';

export const load = (async ({
  params,
}): Promise<
  | {
      document: { id: string; name: string };
      documentUrl: string;
      error?: undefined;
    }
  | { error: string; document?: undefined; documentUrl?: undefined }
> => {
  try {
    const {
      data: { pdf, download_url },
    } = await api.get<{
      pdf: { id: string; name: string };
      download_url: string;
    }>(`/pdfs/${params.id}`);

    return {
      document: pdf,
      documentUrl: download_url,
    };
  } catch (err) {
    return {
      error: getErrorMessage(err),
    };
  }
}) satisfies PageLoad;
