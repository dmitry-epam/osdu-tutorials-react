import { SearchResult } from 'models';
import { handleErrors } from './handleErrors';

export async function findWell(wellName: string): Promise<SearchResult> {
  return fetch(`/api/find?wellname=${wellName}`)
    .then(handleErrors)
    .then(response => response.json());
}

export async function fetchTrajectory(srn: string): Promise<string> {
  return fetch(`/api/fetch?srn=${srn}`)
    .then(handleErrors)
    .then(response => response.text());
}
