import { AUTHENTICATION_ENDPOINT, USER_ENDPOINT } from './endpoints';
import { apiConfigWithAuth } from './apiConfig';
import axios from 'axios';

export const loginWithUsername = (authData: {
  username: string;
  password: string;
}) =>
  axios.post(`/${AUTHENTICATION_ENDPOINT}/login`, authData, {
    headers: apiConfigWithAuth(),
  });

export const loginWithJwtToken = () =>
  axios.get(`${AUTHENTICATION_ENDPOINT}/verifyToken`, {
    headers: apiConfigWithAuth(),
  });

export const getUser = () =>
  axios.get(`${USER_ENDPOINT}`, { headers: apiConfigWithAuth() });
