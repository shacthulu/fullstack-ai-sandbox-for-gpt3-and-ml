// Next API route to test the Presidio bindings from ts-pres

import { NextApiRequest, NextApiResponse } from 'next';
import { AnalyzerApi, Configuration, RecognizerResultWithAnaysisExplanation } from 'ts-pres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') return res.status(404).end();
  const presidioClient: Configuration = new Configuration({
    basePath: 'http://{IP}:{PORT}',
  });
  const analyzerClient: AnalyzerApi = new AnalyzerApi(presidioClient);
  const analyzeRequest = {
    text: 'My name is Donald Duck and my email is dduck@gmail.com"',
    language: 'en',
    analyzerName: 'EMAIL_ADDRESS',
  };
  const analyzeResult = await analyzerClient.analyzePost(analyzeRequest);
  const analyzeResponse: RecognizerResultWithAnaysisExplanation[] = analyzeResult.data;
  return res.status(200).json(analyzeResponse[0]);
}
