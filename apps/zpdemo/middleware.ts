import { NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localtest.me:4200',
  'http://sub.localtest.me:4201',
];

export function middleware(request: Request) {
  console.log('Middleware');

  const origin = request.headers.get('origin');
  console.log(origin);

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  console.log(request.method);
  console.log(request.url);
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', origin || '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization,Set-Cookie'
  );
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
