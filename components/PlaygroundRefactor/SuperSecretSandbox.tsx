/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-spacing */
/* eslint-disable @typescript-eslint/quotes */
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@mantine/core';
import { useState } from 'react';
import EntityTextExtension from './tiptap_EntityTextExtension';
import { SearchAndReplace } from './tt_searchAndReplaceSS';
import ChangeTextNodes from './tt_NodeVisitExtension';

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on <entity> usability </entity> and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function SecretSandbox() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Highlight.configure({ multicolor: true }),
      EntityTextExtension,
      SearchAndReplace.configure({
        searchResultClass: 'search-result', // class to give to found items. default 'search-result'
        caseSensitive: false, // no need to explain
        disableRegex: true, // also no need to explain
      }),
      ChangeTextNodes,
    ],
    parseOptions: {
      preserveWhitespace: true,
    },
    content,
  });
  const [searchTerm, setSearchTerm] = useState<string>('es');

  const [replaceTerm, setReplaceTerm] = useState<string>('astonishing');

  const updateSearchReplace = () => {
    // you can probably use `useCallback` hook)
    if (!editor) return;
    editor?.commands.setSearchTerm(searchTerm);
    editor?.commands.setReplaceTerm(replaceTerm);
  };

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <Button
            variant="outline"
            color="blue"
            size="sm"
            onClick={() => {
              updateSearchReplace();
              console.log('searchTerm', searchTerm);
              console.log('replaceTerm', replaceTerm);
              editor?.commands.changeTextNodes();
            }}
          >
            __boom!
          </Button>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
