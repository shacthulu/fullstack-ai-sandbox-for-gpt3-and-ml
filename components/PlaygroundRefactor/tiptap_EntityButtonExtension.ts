/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mergeAttributes, Node, NodeConfig } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import tiptap_EntityButtonNodeView from './tiptap_EntityButtonNodeView';

export default Node.create({
  name: 'reactComponent',
  inline: true,
  group: 'inline',
  content: 'inline*',
  whitespace: 'pre',

  addAttributes() {
    return {
      type: {
        default: '',
      },
    };
  },

  // This is the HTML attribute that triggers the node to render.  As is we are doing the wrapping via regex client-side synchronously.  Switch to asynchronous server-side and read the data from the database.  React-query "isLoading" = offers a spinner.
  // Using react query we could
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
    return ['entity', mergeAttributes(HTMLAttributes), 0];
  },
  //this is the .getText behavior.  Can easily use this to switch to mustache syntax.   Ex. {{entity_tag=${data}}}.  It handles copy+paste so we do need to maintain content.  langchain can swap this out easy enough as well.  THWEET!
  renderText({ node }) {
    console.log('node.text: ', node);
    if (node.textContent === undefined) {
      return 'undefined content';
} return ``;
  },

  // This handles what gets put in the editor
  addNodeView() {
    return ReactNodeViewRenderer(tiptap_EntityButtonNodeView);
  },
});
