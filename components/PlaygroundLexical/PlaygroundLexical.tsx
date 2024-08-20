import React from 'react';
import { Grid, Text, Title, Paper, Box } from '@mantine/core';
import LexicalEditor from './LexicalEditor';

export default function PlaygroundLexical() {
  return (
    <div>
      <Grid m="lg" grow>
        <Grid.Col span={12}><Title align="center">Lexical Editor Playground</Title></Grid.Col>
        <Grid.Col span={12}>
          <Text align="center">
            This is a sandbox to test our NER systems using our (highly experimental)
            next-gen text editor based on Lexical
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Paper shadow="xs" p="md" m="xl" withBorder>
            <Box>
              <LexicalEditor />
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
