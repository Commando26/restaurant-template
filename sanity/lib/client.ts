import { createClient, type QueryParams } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '@/lib/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isConfigured = Boolean(projectId && projectId !== 'your_project_id_here');

export const client = createClient({
  projectId: isConfigured ? projectId! : 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

/**
 * Type-safe fetch wrapper.
 * - Returns null when Sanity is not yet configured (dev/preview mode).
 * - Logs fetch errors in development instead of swallowing them silently.
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params?: QueryParams,
): Promise<T | null> {
  if (!isConfigured) return null;
  try {
    return params !== undefined
      ? await client.fetch<T>(query, params)
      : await client.fetch<T>(query);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Sanity fetch error]', err);
    }
    return null;
  }
}

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
