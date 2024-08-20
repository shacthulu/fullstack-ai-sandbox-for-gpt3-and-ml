import { Paper, Table } from '@mantine/core';
import React from 'react';

export default function SystemHealth() {
  const systems = [
    {
      name: 'Redis',
      description: 'Chat memory and dictionary cache',
      status: 'OK',
      lastChecked: '2021-10-01',
    },
    {
      name: 'Supabase',
      description: 'Authentication, POSTGREs, vector dabase, and storage',
      status: 'OK',
      lastChecked: '2021-10-01',
    },
    {
      name: 'Analyzer',
      description: 'API Service to query Regex and NER Models for text analysis',
      status: 'OK',
      lastChecked: '2021-10-01',
    },
    {
      name: 'Anonymizer',
      description: 'API Service to mutate text based on provided analyzer input',
      status: 'OK',
      lastChecked: '2021-10-01',
    },
    {
      name: 'OpenAI',
      description: 'Chat model and embeddings for TLP Green and Yellow data',
      status: 'OK',
      lastChecked: '2021-10-01',
    },
  ];

  const ths = (
    <tr>
      <th>System Name</th>
      <th>Status</th>
      <th>Description</th>
      <th>Last Checked</th>
    </tr>
  );

  const rows = systems.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.status}</td>
      <td>{element.description}</td>
      <td>{element.lastChecked}</td>
    </tr>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Table captionSide="bottom" m="xxl">
        <caption>Redline systems</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
}
