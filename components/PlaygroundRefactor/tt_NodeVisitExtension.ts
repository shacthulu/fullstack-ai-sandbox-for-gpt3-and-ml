/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable array-bracket-spacing */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable block-spacing */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/space-infix-ops */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/keyword-spacing */

/* eslint-disable space-in-parens */
/* eslint-disable no-constant-condition */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { TextSelection } from 'prosemirror-state'
import { Plugin } from 'prosemirror-state';
import { Node, Fragment } from 'prosemirror-model';
import { Extension } from '@tiptap/core'

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    changes: {
      /**
       * @description Replace first instance of search result with given replace term.
       */
      changeTextNodes: () => ReturnType,
    }
  }
}

const ChangeTextNodes = Extension.create({
  name: 'changeTextNodes',
    addOptions () {
    return {
      searchResultClass: "search-result",
      caseSensitive: false,
      disableRegex: false,
    }
  },
  addCommands() {
    return {
      changeTextNodes: () => ({ state, tr, dispatch, commands }) => {
        console.log(state.doc)
        console.log()
        const changeTextNodes = (node : any, pos = 0) => {
          if (node.isText) {
            console.log(node)
                const startNode = node.type.schema.text("!>");
                const entityNode = state.schema.nodes.entity.create({type: "US_SSN", text_content: "test"});
                const endNode = node.type.schema.text("<!");
            const newNode = Node.fromJSON(node.type.schema, {
              type: "text",
              text: "<entity>friends</entity>",
            });
            const newNode2 = Node.fromJSON(node.type.schema, {
              type: "text",
              text: "POOP: " + node.text,
            });
            const newNodeArray = [newNode, newNode2];
            const newFragment = Fragment.fromArray(newNodeArray);
            // This works: 
            // tr.replaceWith(pos, pos + node.nodeSize, newNode);
            // This fails with RangeError: Position out of range
            tr.replaceWith(pos, pos+node.nodeSize, newNode)
          } else {
            node.forEach((childNode: any, offset: any) => {
              changeTextNodes(childNode, pos + offset + 1);
            });
          }
        };
        changeTextNodes(state.doc);
        if (tr.docChanged) {
            dispatch && dispatch(tr)
            return true;
        }
        return false;
      },
    };
  },
});

export default ChangeTextNodes;