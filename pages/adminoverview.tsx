import { Flex, Group } from '@mantine/core';
import { AdminPageHeader } from '../components/SystemHealth/AdminHeader';
import { StatPanel } from '../components/SystemHealth/StatPanel';
import SystemHealth from '../components/SystemHealth/SystemHealth';

const statsData: {
  title: string;
  icon: 'clockbolt' | 'happychat' | 'lockheart' | 'coins';
  value: string;
  diff: number;
}[] = [
  {
    title: 'People Hours Saved',
    icon: 'clockbolt',
    value: '127',
    diff: 10,
  },
  {
    title: 'Messages Sent',
    icon: 'happychat',
    value: '376',
    diff: -5,
  },
  {
    title: 'Sensitive Data Privatized',
    icon: 'lockheart',
    value: '200',
    diff: 20,
  },
  {
    title: 'Tokens Used',
    icon: 'coins',
    value: '500',
    diff: 0,
  },
];

const adminPanelLinks = {
  links: [
    {
      link: '/overview',
      label: 'Overview',
    },
    {
      link: '/chat-history',
      label: 'History',
    },
    {
      link: '/community',
      label: 'Community',
    },
    {
      link: '/library',
      label: 'Library',
    },
    {
      link: '/settings',
      label: 'Settings',
    },
    {
      link: '/playground',
      label: 'Playground',
    },
  ],
};

export default function SystemHealthPage() {
  return (
    <div>
      <Flex direction="column">
        <AdminPageHeader links={adminPanelLinks.links} />
        <StatPanel data={statsData} />
        <Group position="center">
          <SystemHealth />
        </Group>
      </Flex>
    </div>
  );
}
