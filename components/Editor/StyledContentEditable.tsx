import { Box, Text } from '@mantine/core';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

export const StyledContentEditable = (props: any) => (
    <Box
      component={ContentEditable}
      style={{
        minHeight: 200,
        width: '100%',
        padding: '0 8px',
        borderRadius: 5,
        paddingTop: 2,
        paddingLeft: 10,
        position: 'relative',
        outline: 'none',
      }}
      {...props}
    />
  );

export const PlaceHolder = (props: any) => (
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
