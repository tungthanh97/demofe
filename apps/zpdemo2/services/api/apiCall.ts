import { AUTHENTICATION_ENDPOINT } from './endpoints';
import { authApi } from './apiEngine';

export const loginWithUsername = (authData: {
  username: string;
  password: string;
}) => authApi.post(`${AUTHENTICATION_ENDPOINT}/login`, authData);

export const loginWithJwtToken = (token: string) =>
  authApi.get(`${AUTHENTICATION_ENDPOINT}/verifyToken`);
