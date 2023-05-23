import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  const body = await req.json();
  const { username, password } = body;
  console.log('login with', username, password, origin);
  return new NextResponse(
    JSON.stringify({ username, ['access-token']: 'Bearer token' }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  //return NextResponse.json({ username, ['access-token']: 'Bearer token' });
}
