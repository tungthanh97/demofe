
import NextCors from 'nextjs-cors';

export function withNextCors(
  handler
) {
  return async function nextApiHandlerWrappedWithNextCors(req, res) {
    const methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];
    await NextCors(req, res, {
      methods,
      origin: "http://localtest.me",
      optionsSuccessStatus: 200,
    });


    return handler(req, res);
  };
}
