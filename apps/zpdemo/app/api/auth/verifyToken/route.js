import { cookies } from 'next/dist/client/components/headers';

export async function GET(req, res) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access-token');
  console.log('call route', req.cookies.cookie, accessToken?.value);
  if (accessToken?.value === 'Bearer token')
    return new Response({ message: 'Hello' }, { status: 200 });
  return new Response({ error: 'Unauthorized' }, { status: 401 });
}
