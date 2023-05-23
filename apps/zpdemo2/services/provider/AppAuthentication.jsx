'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { loginWithJwtToken } from '../api/apiCall';


export function AppAuthentication({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectWithoutRefresh = (path) =>
    router.push(path, undefined, { shallow: true });

  const logout = () => {
    console.log('logout');
    redirectWithoutRefresh('/');
  };

  const login = () => {
    console.log('login');
    redirectWithoutRefresh('/home');
  };

  const getTokenFromRoute = () => {
    console.log('query', searchParams.get('token'));
    return searchParams;
  };

  useEffect(() => {
    const autoLoginWithJwt = async () => {
      try {
        const tokenFromRoute = getTokenFromRoute();
        if (tokenFromRoute) await setCookie('access-token', tokenFromRoute);
        const jwtTokenFromCookie = getCookie('access-token');
        console.log('authenticate with jwt token: ' + jwtTokenFromCookie);

        if (jwtTokenFromCookie) {
          const userData = await loginWithJwtToken(jwtTokenFromCookie);
          console.log('logged in with jwt token', userData.data);
          login();
        } else logout();
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        console.log('finish loading');
      }
    };
    console.log('authenticate load');
    autoLoginWithJwt();
  }, []);

  console.log('refreshing authenticate');

  return children;
}
