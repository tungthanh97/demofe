import axios from 'axios';
import { BASE_URL } from './endpoints';

export const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
