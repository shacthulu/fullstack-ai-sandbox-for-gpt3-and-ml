/* eslint-disable react/jsx-indent-props */
import React from 'react';
import { Box, ScrollArea } from '@mantine/core';
import TreeViewPlugin from '../TreeViewPlugin/TreeViewPlugin';

interface ITreeViewPluginWrapperProps {
    showTreeView: boolean;
}

export default function TreeViewPluginWrapper(props: ITreeViewPluginWrapperProps) {
    if (props.showTreeView) {
        return (
            <ScrollArea style={{ height: 300 }}>
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        padding: theme.spacing.xl,
                        borderRadius: theme.radius.md,
                        cursor: 'pointer',
                    })}
                >
                    <TreeViewPlugin />
                </Box>
            </ScrollArea>);
    }

    return (
        <div />);
}

