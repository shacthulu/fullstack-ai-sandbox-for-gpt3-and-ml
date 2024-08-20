import { Checkbox, Group } from '@mantine/core';
import { useState } from 'react';

export default function ViewSettings() {
  const [value, setValue] = useState<string[]>(['highlight-response']);
  return (
    <Checkbox.Group
      defaultValue={['highlight-response']}
      label="Select view options"
      value={value}
      onChange={(value_) => setValue(value_)}
    >
      <Group mt="xs">
        <Checkbox value="highlight-response" label="Show entity highlights in response" />
        <Checkbox value="highlight-editor" label="Show entity highlights in editor" disabled />
        <Checkbox value="debounce" label="Debounce analysis" disabled />
        <Checkbox value="code-secrets-on-code" label="Only scan code for code secrets" disabled />
        <Checkbox
          value="code-secrets-block"
          label="Only scan full code blocks for secrets"
          disabled
        />
        <Checkbox value="realtime" label="Realtime analysis" disabled />
      </Group>
    </Checkbox.Group>
  );
}
