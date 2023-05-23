'use client';

import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { loginWithJwtToken } from '../api/apiCall';

export function AppAuthentication({ children }) {
  const route = useRouter();

  const logout = () => {
    console.log('logout');
    route.push('/');
  };

  const login = () => {
    route.push('/home');
  };

  console.log('refreshing authenticate');

  useEffect(() => {
    const autoLoginWithJwt = async () => {
      try {
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

  return children;
}
