import { getCookie } from 'cookies-next';

export const apiConfigWithAuth = (inputJWT = getCookie('access_token')) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (inputJWT) {
    headers.Authorization = 'Bearer ' + inputJWT;
  }

  return headers;
};
