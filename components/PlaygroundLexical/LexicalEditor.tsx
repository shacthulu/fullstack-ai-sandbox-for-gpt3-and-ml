/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
import { $getRoot, $getSelection, EditorState } from 'lexical';
import { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { Box, Button, Divider, Flex, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import React from 'react';
import { PlaceHolder, StyledContentEditable } from './ui/StyledContentEditable';
import Toolbar from './plugins/Toolbar/Toolbar';
import playgroundTheme from './theme/PlaygroundEditorTheme';
import SendMessage from './plugins/SendMessage/SendMessage';
import TreeViewPlugin from './plugins/TreeViewPlugin/TreeViewPlugin';
import TreeViewPluginWrapper from './plugins/ShowTreeView/TreeViewPluginWrapper';
import ShowTreeViewButton from './plugins/ShowTreeView/ShowTreeViewButton';
import TheToolbar from './plugins/lkToolbar/TheToolbar';
import { EmoticonNode } from './nodes/EmoticonNode';
import EmoticonPlugin from './plugins/EmoticonPlugin';

function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    console.log(root, selection);
  });
}

function onError(error: Error) {
  console.error(error);
}

interface IInitialConfig {
  namespace: string;
  theme: any;
  nodes: any[];
  onError: (error: Error) => void;
}

const initialConfig: IInitialConfig = {
  namespace: 'playground',
  theme: playgroundTheme,
  nodes: [EmoticonNode],
  onError,
};


export default function LexicalEditor(props: { editorConfig?: IInitialConfig }) {
  const [treeView, setTreeView] = React.useState(false);
  return (
    <LexicalComposer initialConfig={props.editorConfig ?? initialConfig}>
      <Toolbar />
      <Box sx={{ position: 'relative' }}>
        <ScrollArea style={{ height: 300 }}>
          <RichTextPlugin // #312D4B
            contentEditable={<StyledContentEditable />}
            placeholder={<PlaceHolder>Start typing here...</PlaceHolder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <SendMessage sendChat={() => console.log('clicked')} />
        </ScrollArea>
        <ShowTreeViewButton showTreeView={() => setTreeView(!treeView)} />
      </Box>
      <EmoticonPlugin />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      {treeView ? <Divider my="sm" mx={0} /> : <div />}
      <TreeViewPluginWrapper showTreeView={treeView} />
    </LexicalComposer>
  );
}
