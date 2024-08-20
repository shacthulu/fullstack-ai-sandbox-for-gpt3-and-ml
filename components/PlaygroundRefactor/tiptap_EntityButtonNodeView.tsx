/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Text, Menu } from '@mantine/core';
import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/pro-regular-svg-icons'; // <-- import styles to be used
import { IEntity, defaultEntities } from './entity_types';

export default function tiptap_EntityButtonNodeView(props: any): any {
  const { type } = props.node.attrs || 'UNKNOWN';
  const innerText = props.node.textContent;
  console.log('type string', type);
  let entity: IEntity | undefined = defaultEntities.find((object) => object.type === type);
  if (entity === undefined) {
    entity = {
      type: 'UNKNOWN',
      label: 'Unknown',
      description: 'An unknown entity type.',
      fa_icon: faQuestion,
      detectionMethod: 'N/A',
      gradient: { from: 'indigo', to: 'cyan', deg: 45 },
      color: '#A9A9A9',
      tags: ['unknown'],
    };
  }
  return (
    <NodeViewWrapper as="span" className="react-component">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            leftIcon={<FontAwesomeIcon icon={entity.fa_icon} size="xs" />}
            variant="gradient"
            gradient={entity.gradient}
            px={3}
            py={0}
            my={1}
            compact
            onClick={() => console.log(props.node)}
          >
            <Text size="xs" p={0} m={0}>
              {`${props.node.textContent} `}
            </Text>
          </Button>
        </Menu.Target>

        <Menu.Dropdown p={3} m={0} style={{ zIndex: '1000' }}>
          <Menu.Label>{entity.label}</Menu.Label>
          <Menu.Item>Change Type</Menu.Item>
          <Menu.Item color="red">Mark Non-Sensitive</Menu.Item>
          <Menu.Divider />
          <Menu.Label>{entity.description}</Menu.Label>
          <Menu.Label>Found by: {entity.detectionMethod}</Menu.Label>
          <Menu.Label>Tags: {entity.tags}</Menu.Label>
        </Menu.Dropdown>
      </Menu>
    </NodeViewWrapper>
  );
}
