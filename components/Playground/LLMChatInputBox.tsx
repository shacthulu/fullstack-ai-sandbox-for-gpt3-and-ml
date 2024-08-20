import { Button, Flex } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { IconSend } from '@tabler/icons';
import { Editor } from '@tiptap/react';
import { useElementSize } from '@mantine/hooks';

interface LLMChatInputBoxProps {
  editor: Editor | null;
  sendChat: () => void;
}

export default function LLMChatInputBox(props: LLMChatInputBoxProps): any {
  const { ref, width, height } = useElementSize();
  return (
    <RichTextEditor editor={props.editor} style={{ overflowY: 'auto' }}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content
        style={{
          minHeight: 300,
          maxHeight: 300,
          overflowY: 'auto',
          zIndex: 1,
        }}
        ref={ref}
      >
        <Flex
          justify="flex-end"
          align="flex-end"
          style={{
            position: 'absolute',
            width: `${width - 20}px`,
            height: `${height - 10}px`,
          }}
        >
          <Button variant="light" compact onClick={props.sendChat} style={{ zIndex: 2 }}>
            <IconSend size="1rem" />
          </Button>
        </Flex>
      </RichTextEditor.Content>
    </RichTextEditor>
  );
}
