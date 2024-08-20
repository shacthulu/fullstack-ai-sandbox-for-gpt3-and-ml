import { IconTestPipe, IconChartInfographic, IconForms } from '@tabler/icons-react';
import React from 'react';
import { Paper, SimpleGrid, Title } from '@mantine/core';
import DevModeCard from './DevModeCards';

interface DevModeCardProps {
  title: string;
  description: string;
  link: string;
  icon: JSX.Element;
}

const pages: DevModeCardProps[] = [
  {
    title: 'NER Playground',
    description:
      'The natural entity recognition playground.  Here you can test entity detection, models, and see their interactions with deidentification and language models.',
    link: '/playground',
    icon: <IconTestPipe />,
  },
  {
    title: 'Admin Overview',
    description:
      'This page shows all kinds of administrative information as a dashboard.  It will show system availability, token usage, time savings, and other metrics',
    link: '/adminoverview',
    icon: <IconChartInfographic />,
  },
  {
    title: 'Login Page',
    description: 'This is simply the login page.  Not much to see here.',
    link: '/login',
    icon: <IconForms />,
  },
];

export default function DevModeIndexPage() {
  // Create a simple grid of DevModeCards from the pages array
  return (
    <>
      <Title
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        ta="center"
        fw={700}
        m="xl"
      >
        Welcome to the DevMode Index
      </Title>
      <Paper radius="md" m="xl" shadow="xs" py="xl">
        <SimpleGrid cols={3} spacing="md" pb="lg" px="xs">
          {pages.map((page, index) => (
            <DevModeCard
              key={index}
              title={page.title}
              description={page.description}
              link={page.link}
              icon={page.icon}
            />
          ))}
        </SimpleGrid>
      </Paper>
    </>
  );
}
