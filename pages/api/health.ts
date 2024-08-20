/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next';
import { AnalyzerApi, AnonymizerApi } from 'ts-pres';
import { createClient } from 'redis';
import { Configuration, OpenAIApi } from 'openai';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// This can be queried via curl http://{IP}:{PORT}/api/health\?system\=analyzer

// TODO refactor health checks to gracefully handle a timeout/unavailable system like is done in the 'redis' case.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') return res.status(404).end();
  switch (req.query.system) {
    case 'analyzer':
      const analyzerClient: AnalyzerApi = new AnalyzerApi({
        basePath: process.env.PRESIDIO_ANALYZER_ENDPOINT,
      });
      const analyzeResult = (await analyzerClient.healthGet()).data;
      return res.status(200).json(analyzeResult);
    case 'anonymizer':
      const anonymizedClient: AnonymizerApi = new AnonymizerApi({
        basePath: process.env.PRESIDIO_ANONYMIZER_ENDPOINT,
      });
      const anonymizeResult = (await anonymizedClient.healthGet()).data;
      return res.status(200).json(anonymizeResult);
    case 'redis':
      let isUp = false;
      const redisClient = createClient({
        url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
      });
      const connectPromise = redisClient.connect();
      try {
        await connectPromise;
      } catch (e) {
        console.log(e);
      }
      isUp = redisClient.isOpen && redisClient.isReady;
      if (isUp) {
        await redisClient.quit();
        return res.status(200).json({ redis: 'ok' });
      }
        return res.status(500).json({ redis: 'error' });
    case 'supabase':
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const supabase = createSupabaseClient(
          process.env.SUPABASE_URL || '',
          process.env.SUPABASE_ANON_KEY || ''
        );
        return res.status(200).json({ supabase: 'ok' });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ supabase: 'error' });
      }
    case 'openai':
      // Check if the chatgpt model is available
      const openaiClient = new OpenAIApi(
        new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        })
      );
      const openaiResult = (await openaiClient.listEngines()).data;
      const chatgptModel = openaiResult.data.find((engine) => engine.id === 'gpt-4');
      if (chatgptModel) {
        return res.status(200).json({ openai: 'ok' });
      }
        return res.status(500).json({ openai: 'error' });
    default:
      return res.status(404).end();
  }
}
