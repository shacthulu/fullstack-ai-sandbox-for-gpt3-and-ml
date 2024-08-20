import { Box, Slider, Text } from '@mantine/core';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import { useAnalysisRequestSettings } from './Playground';

export default function AcceptanceSensitivitySlider() {
  const { setAnalysisRequestSettings } = useAnalysisRequestSettings();
  function handleSensitivitySelection(value: number) {
    console.log('value', value);
    setAnalysisRequestSettings((prevSettings) => ({
      ...prevSettings,
      scoreThreshold: value,
    }));
  }
  return (
    <Box>
      <Text size="lg" mt="xs" fw={500}>
        Acceptance Sensitivity Threshold
      </Text>
      <Slider
        marks={[
          { value: 0.25, label: '25%' },
          { value: 0.5, label: '50%' },
          { value: 0.75, label: '75%' },
        ]}
        onChangeEnd={handleSensitivitySelection}
        step={0.05}
        defaultValue={0.8}
        min={0.0}
        max={1.0}
        precision={2}
        mt="xs"
      />
    </Box>
  );
}
