import { Title, Text, Anchor } from '@mantine/core';
import useStyles from './Welcome.styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const fetchHealth = async () => {
  const response = await fetch('http://{IP}:{PORT}/api/presbindings', {
    method: 'GET',
    redirect: 'follow',
  });
  const result = await response.text();

  return result;
};

export function Welcome() {
  type WebsiteTextResponse = {
    text: string;
  };
  const WebsiteText: React.FC = () => {
    const { data, isLoading, error } = useQuery(['health'], fetchHealth);
    if (isLoading) return <div>Loading...</div>;
    if (error) {
      console.log(error);
      return <div>Error</div>;
    }
    console.log(data);
    return <div>Fact: {data}</div>;
  };
  const { classes } = useStyles();
  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to <Text inherit variant="gradient" component="span">Lorem</Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        Lorem ipsum
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          <WebsiteText />
        </Anchor>
      </Text>
    </>
  );
}
