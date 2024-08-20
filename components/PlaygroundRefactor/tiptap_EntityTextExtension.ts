/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import tiptap_EntityTextNodeView from './tiptap_EntityTextNodeView';

export default Node.create({
  name: 'entity',
  inline: true,
  group: 'inline',
  content: 'text*',
  whitespace: 'pre',

addAttributes() {
  return {
    type: {
      default: '',
    },
    text_content: {
      default: '',
    },
  };
},
  parseHTML() {
    return [
      {
        tag: 'entity',
      },
    ];
  },

  parseText() {
    return [
      {
        tag: 'entity',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['entity', HTMLAttributes, 0];
  },
  renderText({ node }) {
    console.log('node.text: ', node);
    if (node.textContent === undefined) {
      return 'undefined content';
} return ``;
  },
  addNodeView() {
    return ReactNodeViewRenderer(tiptap_EntityTextNodeView);
  },
});
