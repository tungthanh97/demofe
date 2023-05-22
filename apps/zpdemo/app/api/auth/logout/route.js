import { cookies } from 'next/dist/client/components/headers';
import { serialize } from 'cookie';

export async function GET(req, res) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access-token');
  if (accessToken === 'Bearer token') {
    const serialised = serialize('access-token', null, {
      maxAge: -1,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialised);

    return res.status(200).json({ message: 'Successfuly logged out!' });
  }

  return res.status(401).json({ error: 'Unauthorized' });
}
