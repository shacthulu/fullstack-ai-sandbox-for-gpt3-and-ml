/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  AnalyzeRequest,
  AnalyzerApi,
  Configuration,
  RecognizerResultWithAnaysisExplanation,
} from 'ts-pres';

export interface RecognizerResultWithSubstring extends RecognizerResultWithAnaysisExplanation {
  substring: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecognizerResultWithSubstring[]>
) {
  const {
    text,
    language,
    correlationId,
    scoreThreshold,
    entities,
    returnDecisionProcess,
    adHocRecognizers,
    context,
  } = req.body;
  console.log('req.body', req.body);
  const analyzeRequest: AnalyzeRequest = {
    text: text || '',
    language: language || '',
    correlationId: correlationId || undefined,
    scoreThreshold: scoreThreshold || undefined,
    entities: entities || undefined,
    returnDecisionProcess: returnDecisionProcess || false,
    adHocRecognizers: adHocRecognizers || [],
    context: context || [],
  };
  console.log('analyzeRequest', analyzeRequest);
  const presidioClient: Configuration = new Configuration({
    basePath: process.env.PRESIDIO_ANALYZER_ENDPOINT,
  });
  const analyzerClient: AnalyzerApi = new AnalyzerApi(presidioClient);
  console.log('analyze request', analyzeRequest);
  const analyzeResult = await analyzerClient.analyzePost(analyzeRequest);
  // console.log('analyze result', analyzeResult);
  const analyzeResponse: RecognizerResultWithSubstring[] = analyzeResult.data.map(
    (result: RecognizerResultWithAnaysisExplanation) => {
      const { start, end, analysisExplanation, ...otherProps } = result;
      const substring = analyzeRequest.text.substring(start, end + 1);
      //@ts-ignore
      let entityType = result.entity_type ?? 'unknown';
      return {
        substring,
        start,
        end,
        analysisExplanation,
        ...otherProps,
        entityType,
      };
    }
  );
  console.log('analyze response', analyzeResponse);

  return res.status(200).json(analyzeResponse);
}
