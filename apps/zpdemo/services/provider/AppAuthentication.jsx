'use client';

import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { loginWithJwtToken } from '../api/apiCall';
import { Spinner } from '../../components/Spinner';

export function AppAuthentication({ children }) {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    console.log('logout');
    localStorage.setItem('isAuthenticated', 'false');
    setIsLoading(false);
    route.push('/');
  };

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    route.push('/home');
  };

  const isAuthenticated = () => {
    const authenticationStatus = localStorage.getItem('isAuthenticated');

    return authenticationStatus === 'true';
  };

  console.log('refreshing authenticate', isLoading);

  useEffect(() => {
    const autoLoginWithJwt = async () => {
      setIsLoading(true);
      try {
        const jwtTokenFromCookie = getCookie('access-token');
        console.log('authenticate with jwt token: ' + jwtTokenFromCookie);

        if (jwtTokenFromCookie) {
          const userData = await loginWithJwtToken(jwtTokenFromCookie);
          console.log('logged in with jwt token', userData);
          login();
        } else logout();
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        console.log('finish loading');
        setIsLoading(false);
      }
    };
    console.log('authenticate load');
    //  if (isAuthenticated()) route.push('/home');
    autoLoginWithJwt();
    setIsLoading(false);
  }, []);

  return isLoading ? <Spinner /> : children;
}
