import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const body = await req.json();
  const { username, password } = body;
  console.log('login with', username, password);
  return new Response({ username, ['access-token']: 'Bearer token' }, {
    status: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });

  //return NextResponse.json({ username, ['access-token']: 'Bearer token' });
}
