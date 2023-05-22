import { AUTHENTICATION_ENDPOINT, USER_ENDPOINT } from './endpoints';
import { authApi } from './apiEngine';

export const loginWithUsername = (authData: {
  username: string;
  password: string;
}) => authApi.post(`${AUTHENTICATION_ENDPOINT}/login`, authData);

export const loginWithJwtToken = () =>
  authApi.get(`${AUTHENTICATION_ENDPOINT}/verifyToken`);

export const getUser = () => authApi.get(`${USER_ENDPOINT}`);
