/**
 * Returns true only for safe http/https URLs and root-relative paths.
 * Blocks javascript:, data:, vbscript:, and protocol-relative (//evil.com) URLs.
 */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    // Not an absolute URL — allow root-relative paths only
    return url.startsWith('/') && !url.startsWith('//');
  }
}
