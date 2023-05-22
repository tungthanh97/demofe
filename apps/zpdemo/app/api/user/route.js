import { withNextCors } from "../../../services/middleware/withNextjsCors";

export async function GET(req, res) {
  const { cookies } = req;

  console.log('cookies', cookies?.['access-token']);
  const jwt = cookies?.['access-token'];

  if (!jwt) {
    return res.status(401).json({ message: 'Invalid token!' });
  }

  return res.status(200).res.json({ data: 'Top secret data!' });
}

export const POST = withNextCors(async (req, res) => {
  console.log('test')
  return new Response({ error: 'authorized' }, { status: 200 });
})
