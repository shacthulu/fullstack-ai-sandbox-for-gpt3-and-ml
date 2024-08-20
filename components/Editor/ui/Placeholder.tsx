import { Box, Text } from '@mantine/core';

export const Placeholder = (props: any) => (
    <Box
      style={{
        position: 'absolute',
        top: 2,
        left: 8,
        userSelect: 'none',
        display: 'inline-block',
        pointerEvents: 'none',
      }}
      {...props}
    >
    <Text m={0} p={0} color="gray">{props.children}</Text>
    </Box>
  );
