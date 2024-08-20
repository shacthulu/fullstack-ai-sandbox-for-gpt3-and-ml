import React from 'react';
import { Group, ActionIcon } from '@mantine/core';
import { activePluginsList, pluginsList } from './ToolbarButtons/ToolbarButtons';
import useOnToolbarClick from './useOnToolbarClick';

export default function Toolbar() {
    const onClick = useOnToolbarClick();
    const renderActivePlugins = () => {
        const activePlugins = pluginsList.filter(plugin => activePluginsList.includes(plugin.id));
        return activePlugins.map((plugin) => (
            <ActionIcon variant="subtle" p="xs" key={plugin.id} onClick={(e) => onClick(e, plugin.action)}>
                {plugin.icon}
            </ActionIcon>
        ));
    };

    return (
        <Group grow>
            {renderActivePlugins()}
        </Group>
    );
}
