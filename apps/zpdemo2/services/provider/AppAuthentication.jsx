'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { loginWithJwtToken } from '../api/apiCall';
import { Spinner } from '../../components/Spinner';

export function AppAuthentication({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const logout = () => {
    console.log('logout');
    localStorage.setItem('isAuthenticated', 'false');
    setIsLoading(false);
    router.push('/');
  };

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/home');
  };

  const getTokenFromRoute = () => {
    console.log('query', searchParams.get('token'));
    return searchParams.get('token');
  };

  useEffect(() => {
    const autoLoginWithJwt = async () => {
      setIsLoading(true);
      try {
        const tokenFromRoute = getTokenFromRoute();
        if (tokenFromRoute) await setCookie('access-token', tokenFromRoute);
        const jwtTokenFromCookie = getCookie('access-token');
        console.log('authenticate with jwt token: ' + jwtTokenFromCookie);

        if (jwtTokenFromCookie) {
          const userData = await loginWithJwtToken(jwtTokenFromCookie);
          console.log('logged in with jwt token', userData);
          login();
        } else logout();
      } catch (err) {
        console.error(err);
        //logout();
      } finally {
        console.log('finish loading');
        setIsLoading(false);
      }
    };
    console.log('authenticate load');
    //if (isAuthenticated()) route.push('/home');
    autoLoginWithJwt();
  }, []);

  return isLoading ? <Spinner /> : children;
}
