'use client';
import { deleteCookie } from 'cookies-next';

export default async function Home() {
  const logOut = () => {
    console.log('logOut');
    deleteCookie('access_token');
  };

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <h3 className="font-bold text-2xl">Welcome Home</h3>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        onClick={() => logOut()}
      >
        Logout
      </button>
    </div>
  );
}
