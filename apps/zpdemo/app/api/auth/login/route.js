import { NextResponse } from 'next/server';
import NextCors from 'nextjs-cors';

export async function POST(req, res) {
  res.setHeader('Allow', 'POST');
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: ['http://localtest.me:4000', 'http://sub.localtest.me:4001'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const body = await req.json();
  const { username, password } = body;
  console.log('login with', username, password);
  return NextResponse.json({ username, ['access-token']: 'Bearer token' });
}
