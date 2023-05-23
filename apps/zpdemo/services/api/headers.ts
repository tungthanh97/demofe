const genCorsHeader = (origin: string) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});
