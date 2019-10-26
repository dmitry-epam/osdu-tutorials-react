import papa from 'papaparse';

export function parseScv<T>(data: string): T[] {
  return papa.parse(data, { header: true }).data;
}
