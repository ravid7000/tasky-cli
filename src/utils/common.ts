import get from 'lodash/get';

export function isAuthenticated(data: object) {
  return get(data, 'd.user.token', '') !== '';
}

export function toKey(...rest: string[]) {
  return rest.join('.');
}
