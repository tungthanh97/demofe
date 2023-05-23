'use client';

import { useRef } from 'react';
import { loginWithUsername } from '../services/api/apiCall';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Index() {
  //const [authData, setAuthData] = useState({ username: '', password: '' });
  const pwRef = useRef();
  const userNameRef = useRef();
  const route = useRouter();
  const handleLogin = async (authData) => {
    try {
      const sessionData = await loginWithUsername(authData);
      console.log('login success', sessionData);
      const jwtToken = sessionData['access-token'];
      await setCookie('access-token', jwtToken, {
        domain: 'localtest.me',
      });
      route.push('/home');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const authData = {
      username: userNameRef.current.value,
      password: pwRef.current.value,
    };
    console.log('login', authData);
    handleLogin(authData);
  };

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <header className="max-w-lg mx-auto">
        <a href="#">
          <h1 className="text-4xl font-bold text-white text-center">Startup</h1>
        </a>
      </header>

      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Welcome to ZP</h3>
          <p className="text-gray-600 pt-2">Sign in to your account.</p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                Username
              </label>
              <input
                ref={userNameRef}
                type="text"
                id="username"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                Password
              </label>
              <input
                ref={pwRef}
                type="password"
                id="password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
              >
                Forgot your password?
              </a>
            </div>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
