'use client';

import { useState } from 'react';
import { getUser } from '../../services/api/apiCall';
import { getCookie } from 'cookies-next';

export default function Home() {
  const [userInfo, setUserInfo] = useState();
  const token = getCookie('access-token');
  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUser();
      setUserInfo(userInfo.data);
    } catch (err) {
      console.error(err);
    }
  };
  const encodedToken = encodeURIComponent(token)
  console.log('token', encodedToken)

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <h3 className="font-bold text-2xl">Welcome Home</h3>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        onClick={() => fetchUserInfo()}
      >
        User
      </button>
      <a
        target="_blank"
        href={`http://sub.localtest.me:4201/?token=${encodedToken}`}
        rel="noopener noreferrer"
      >
        <div>Subdomain</div>
      </a>

      {userInfo && <div>{userInfo}</div>}
    </div>
  );
}
