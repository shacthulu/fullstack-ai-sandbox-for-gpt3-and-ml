/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */

import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

interface RawRule {
  [key: string]: string;
}

interface Rule {
  'pattern-name': string;
  'pattern-regex': string;
  'pattern-confidence': string;
}

interface RequestBody {
  text: string;
  ruleset: string;
}

//TODO: This code is a mess.  Clean it up.

interface Result {
  'pattern-name': string;
  string: string;
  'pattern-regex': string;
  'pattern-confidence': string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Parse the incoming request
  const { text, ruleset } = req.body as Partial<RequestBody>;

  if (!text || !ruleset) {
    return res.status(400).json({ error: 'Text and ruleset are required.' });
  }

  // Connect to Redis
  const redis = new Redis({ host: process.env.REDIS_URL, port: Number(process.env.REDIS_PORT) });

  // Test the connection
  try {
    await redis.ping();
  } catch (error) {
    return res.status(500).json({ error: 'Could not connect to Redis.' });
  }

  const activeRules: Rule[] = [];
  let ic = '0';
  do {
    // console.log('ic:', ic);
    const [cursor, keys] = await redis.scan(
      ic,
      'MATCH',
      `global:secrets:patterns:code:${ruleset}*`,
      async (err, res) => {
        if (err) {
          console.log('err:', err);
        }
        // console.log('res:', res);
        res &&
          res[1].map(async (key: string | string[]) => {
            // console.log('key:', key);
            key = key as string;
            const rawRule: RawRule = await redis.hgetall(key);
            // console.log('rawRule:', rawRule);
            const rule: Rule = {
              'pattern-name': rawRule['pattern-name'],
              'pattern-regex': rawRule['pattern-regex'],
              'pattern-confidence': rawRule['pattern-confidence'],
            };
            //   console.log('rule:', rule);
            activeRules.push(rule);
            return;
          });
      }
    );
    ic = cursor;
  } while (ic !== '0');

  // Verify if the ruleset exists
  if (!activeRules) {
    redis.disconnect();
    return res.status(404).json({ error: `Ruleset ${ruleset} not found.` });
  }

  // Prepare the results array
  let results: Result[] = [];
  activeRules.map((rule) => {
    let regex = new RegExp(rule['pattern-regex']);
    let matches = text.match(regex);
    if (matches != null) {
      matches.forEach((match) => {
        results.push({
          'pattern-name': rule['pattern-name'],
          string: match,
          'pattern-regex': rule['pattern-regex'],
          'pattern-confidence': rule['pattern-confidence'],
        });
      });
    }
  });

  redis.disconnect();
  // Return the results
  res.status(200).json(results);
}
