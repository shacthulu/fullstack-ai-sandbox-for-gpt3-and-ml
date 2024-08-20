/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { Box, Select, Text } from '@mantine/core';
import { useState } from 'react';
import { useAnalysisRequestSettings } from './Playground';

const models = [
  {
    value: 'stanfordaimi/stanford-deidentifier-base',
    label: 'StanfordAIMI/stanford-deidentifier (hugging face)',
    disabled: true,
  },
  { value: 'obi/deid_roberta_i2b2', label: 'obi/deid_roberta_i2b2 - hugging face', disabled: true },
  {
    value: 'flair/ner-english-large',
    label: 'flair/ner-english-large - hugging face',
    disabled: true,
  },
  { value: 'en_core_web_lg', label: 'spaCy en_core_web_lg (local)' },
];

export default function ModelSelector() {
  const [modelSelected, setModelSelected] = useState<string>();
  const { analysisRequestSettings, setAnalysisRequestSettings } = useAnalysisRequestSettings();
  const handleModelSelection = (selectedModel: string) => {
    // TODO: the current parent component does not have model in its schema.
    // setSettings((prevSettings) => ({
    //   ...prevSettings,
    //   model: selectedModel,
    // }));
    setModelSelected(selectedModel);
  };
  return (
    <Box>
      <Text size="lg" mt="md" fw={500}>
        NER Model
      </Text>
      <Select data={models} onChange={handleModelSelection} defaultValue="en_core_web_lg" />
    </Box>
  );
}
