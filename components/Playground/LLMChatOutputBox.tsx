import { Button, Flex, Grid, Box } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { IconSend } from '@tabler/icons';
import SettingsPane from './SettingsPane';
import { Editor } from '@tiptap/react';
import { useElementSize } from '@mantine/hooks';

interface LLMChatOutputBoxProps {
  resultEditor: Editor | null;
}

export default function LLMChatOutputBox(props: LLMChatOutputBoxProps): any {
  return (
    <RichTextEditor editor={props.resultEditor} style={{ overflowY: 'auto' }}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content style={{ minHeight: 300, maxHeight: 500, overflowY: 'auto' }} />
    </RichTextEditor>
  );
}
