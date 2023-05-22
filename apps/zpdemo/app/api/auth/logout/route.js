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

    return new Response({ message: 'Successfuly logged out' }, { status: 200, headers: { 'Set-Cookie': serialised } });
  }

  return new Response({ error: 'Unauthorized' }, { status: 401 });
}
