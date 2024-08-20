// Display the system health component

import React from 'react';
import { StatPanel } from '../components/SystemHealth/StatPanel';

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

export default function SystemHealthPage() {
  return (
    <div>
      <StatPanel data={statsData} />
    </div>
  );
}
