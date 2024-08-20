/* eslint-disable no-console */
import { Select, Text, Box } from '@mantine/core';
import { useState } from 'react';

const codeSecrets = [
  { value: 'generic', label: 'Generic', disabled: true },
  { value: 'git-leaks', label: 'Git Leaks Tool Set', disabled: true },
  { value: 'high-confidence', label: 'High Confidence Set', disabled: true },
  { value: 'leakin-regexes', label: 'Leakin Tool Set', disabled: true },
  { value: 'nuclei-generic-1', label: 'Nuclei Tool Generic Set', disabled: true },
  { value: 'nuclei-regexes', label: 'Nuclei Tool Set', disabled: true },
  { value: 'trufflehog-v3', label: 'Trufflehog v3 Tool Set', disabled: true },
  { value: 'all', label: 'All Sets', disabled: true },
];

export default function CodeSecretsSelector() {
  const [codeSecretsEnabled, setCodeSecretsEnabled] = useState<string>();
  function handleOnChange(value: string) {
    console.log(codeSecretsEnabled);
    if (typeof value === 'string') {
      setCodeSecretsEnabled(value);
    } else if (typeof value === undefined) {
      setCodeSecretsEnabled('');
    } else setCodeSecretsEnabled('');
  }
  return (
    <Box>
      <Text size="lg" mt="xs" fw={500}>
        Code Secret Ruleset
      </Text>
      <Select
        data={codeSecrets}
        value={codeSecretsEnabled}
        onChange={handleOnChange}
        placeholder="Default (none)"
        clearable
      />
    </Box>
  );
}
