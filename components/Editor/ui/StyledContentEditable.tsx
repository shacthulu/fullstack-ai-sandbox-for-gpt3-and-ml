import { Box } from '@mantine/core';
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
