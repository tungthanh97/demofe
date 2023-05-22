'use client';

import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { loginWithJwtToken } from '../api/apiCall';
import { Spinner } from '../../components/Spinner';

export function AppAuthentication({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  const isAuthenticated = () => {
    const authenticationStatus = localStorage.getItem('isAuthenticated');

    return authenticationStatus === 'true';
  };

  const getTokenFromRoute = () => {
    const { token } = router.query;
    return token;
  };

  useEffect(() => {
    const autoLoginWithJwt = async () => {
      setIsLoading(true);
      try {
        const jwtTokenFromCookie =
          getCookie('access-token') ?? getTokenFromRoute;
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
    //if (isAuthenticated()) route.push('/home');
    autoLoginWithJwt();
  }, []);

  return isLoading ? <Spinner /> : children;
}
