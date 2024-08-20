/* eslint-disable block-spacing */
/* eslint-disable @typescript-eslint/brace-style */
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
import { Extension } from '@tiptap/core';
import { RawCommands } from '@tiptap/react';

// TODO: Refactor so the multilist can do progressive additions without the wrapAll.  i.e. first occurrence, second occurrence, etc.

export interface ISearchAndWrapOptions {
  HTMLAttributes?: Record<string, any>,
  replaceAll?: boolean,
  defaultTag?: string,
}

interface ISearchAndWrapWithNodeSingleOptions {
  search: string,
  tag: string,
  wrapAll?: boolean,
  wrapWith?: string,
  mutate?: (input: any) => string,
  otherProps?: Record<string, string>[],
}

interface ISearchAndWrapWithNodeMultipleOptions {
  listOfSearchAndWrap: ISearchAndWrapWithNodeSingleOptions[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    searchAndWrap: {
      searchAndWrapWithNodeSingle: (props: ISearchAndWrapWithNodeSingleOptions) => ReturnType,
      searchAndWrapWithNodeMultiple: (props: ISearchAndWrapWithNodeMultipleOptions) => ReturnType,
    }
  }
}

export const searchAndReplace = Extension.create<ISearchAndWrapOptions>({
  name: 'searchAndWrap',
  addCommands() {
    const newCommands: Partial<RawCommands> = {
      searchAndWrapWithNodeSingle: (input: ISearchAndWrapWithNodeSingleOptions) => (props: any) => {
        console.log("props", props)
        const { commands, editor, state } = props
        for(let i = 0; i < state.doc.content.childCount; i++) {
          try{ const node = state.doc.content.child(i) 
                    console.log('node', node)
          console.log('node type', node.type)
          console.log('node text', node.textContent)
          console.log('node attrs', node.attrs)
          console.log('node marks', node.marks)}
          catch(e) { console.log(e) }
        }
        commands.selectAll()
        commands.clearNodes()
        const textContent = editor.getText()
        const searchRegex: RegExp = new RegExp(input.search, 'g')
        let match = searchRegex.exec(textContent)
        let tagWithProps = input.tag;
            if(input.otherProps) {
            input.otherProps.forEach(prop => {
              Object.keys(prop).forEach(key => {
                tagWithProps += ` ${key}="${prop[key]}"`;
              });
            });
          }
        while(match !== null) {
          console.log('match', match)
          console.log('match index', match?.index)
          console.log('match length', match?.length)
          console.log('match index', searchRegex.lastIndex)
          console.log('match string', match?.[0] )

          const matchIndex = match?.index || 0
          // commands.setTextSelection({ from: matchIndex + 1 || 0, to: searchRegex.lastIndex + 1 })
          // commands.toggleNode('text', 'reactComponent', { split: true })
          console.log(editor?.selection)
          commands.insertContentAt({from: matchIndex + 1, to: searchRegex.lastIndex + 1}, `<${tagWithProps}>${match?.[0]}</${input.tag}>`)
          if (!input.wrapAll) break;
          match = searchRegex.exec(textContent)
        }
        console.log("Select parent node", commands.selectParentNode())
        console.log('editor HTML', editor?.getHTML())
        console.log('editor Text', editor?.getText())
        return true
      },
      searchAndWrapWithNodeMultiple: (input: ISearchAndWrapWithNodeMultipleOptions) => (props: any) => {
        const { commands } = props;
        const { listOfSearchAndWrap } = input;
        listOfSearchAndWrap.forEach(nodeWrapper => {
          commands.searchAndWrapWithNodeSingle(nodeWrapper);
  });

  return false;
},
    }
    return newCommands;
  },
})

