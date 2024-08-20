/* eslint-disable no-console */
// Make a Next.js handler
import { NextApiRequest, NextApiResponse } from 'next';

// Tasks can be queried via curl a la curl http://{IP}:{PORT}/api/health\?task\=migrate-database

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') return res.status(404).end();

  switch (req.query.task) {
    case 'ping':
      console.log('pong');
      break;
    case 'migrate-database':
      console.log('migrating database');
      break;
  }
}
