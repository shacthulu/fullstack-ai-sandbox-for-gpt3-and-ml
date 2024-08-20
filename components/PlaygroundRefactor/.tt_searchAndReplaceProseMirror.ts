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
import { Extension } from '@tiptap/core';
import { RawCommands } from '@tiptap/react';

// TODO: Refactor so the multilist can do progressive additions without the wrapAll.  i.e. first occurrence, second occurrence, etc.

// type Node = {
//   type: {
//     name: string;
//   };
//   textContent: string;
//   isText: boolean;
//   isLeaf: boolean;
//   firstChild: () => Node;
//   content?: Node | Node[];
// };

// interface INode {
//     type: {
//         name: string;
//     };
//     textContent: string;
//     isText: boolean;
//     isLeaf: boolean;
//     text: string;
//     firstChild: () => INode;
//     content?: INode | INode[];
// }

// function isINodeArray(content: INode | INode[]): content is INode[] {
//   return Array.isArray(content);
// }

function printNodes(obj: any, tr: any): void {
  const search: string = "component"
  if (obj.type?.name === 'entity') {
    console.log("Entity");
    // const textContent = obj.content?.[0]?.content?.text ?? '';
    // This should work below, but instead has an "content doesn't exist on INode[]"
    // @ts-ignore
    // console.log(obj.content.content[0].text = "roughage")
    console.log(obj.content.content[0].text = obj.content.content[0].text.replace(/component/g, "<h2>exem</h2>"));
    // tr.selectParentNode();
    tr.insertText(obj.content.content[0].text);
    // console.log(obj.content.content[0].text)
    // console.log(obj.textContent.replace(/usability/g, "<entity>$&:</entity>"));
    return;
  }

  if (obj.isText && obj.isLeaf) {
    console.log("Text")
    console.log(obj.textContent);
    console.log(obj.text = obj.text.replace(/component/g, "<h2>pleray:</h2>"));
    console.log(obj.text);
    // console.log(obj.textContent.replaceAll("usability", "<entity>$1:</entity>"))
  }

  if (obj.content) {
    if (Array.isArray(obj.content)) {
      for (const child of obj.content) {
        printNodes(child, tr);
      }
    } else {
      printNodes(obj.content, tr);
    }
  }
}
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
        const { commands, editor, doc } = props
        console.log(props)
        commands.selectAll()
        commands.clearNodes()
        const textContent = editor.getText()
        const searchRegex: RegExp = new RegExp(input.search, 'g')
        let match = searchRegex.exec(textContent)
        let tagWithProps = input.tag;
        if (input.otherProps) {
          input.otherProps.forEach(prop => {
            Object.keys(prop).forEach(key => {
              tagWithProps += ` ${key}="${prop[key]}"`;
            });
          });
        }
        while (match !== null) {
          console.log('match', match)
          console.log('match index', match?.index)
          console.log('match length', match?.length)
          console.log('match index', searchRegex.lastIndex)
          console.log('match string', match?.[0])

          const matchIndex = match?.index || 0
          // commands.setTextSelection({ from: matchIndex + 1 || 0, to: searchRegex.lastIndex + 1 })
          // commands.toggleNode('text', 'reactComponent', { split: true })
          console.log(editor?.selection)
          commands.insertContentAt({ from: matchIndex + 1, to: searchRegex.lastIndex + 1 }, `<${tagWithProps}>${match?.[0]}</${input.tag}>`)
          if (!input.wrapAll) break;
          match = searchRegex.exec(textContent)
        }
        console.log("Select parent node", commands.selectParentNode())
        console.log('editor HTML', editor?.getHTML())
        console.log('editor Text', editor?.getText())
        return true
      },

      searchAndWrapWithNodeMultiple: (input: ISearchAndWrapWithNodeMultipleOptions) => (props: any) => {
        // const { commands } = props;
        const { listOfSearchAndWrap } = input;
        const { commands, editor, state, tr } = props
        console.log(tr)
        printNodes(tr.doc.content, tr);
        // tr.doc.content.forEach((node: any) => {
        //     console.log(node.textContent);
        // });
        console.log(tr)
        tr.doc.replace(0, tr.doc.content.size, tr.doc.content);
        console.log('editor HTML', editor?.getHTML())
        listOfSearchAndWrap.forEach(nodeWrapper => {
          commands.searchAndWrapWithNodeSingle(nodeWrapper);
        }

        );

        return true;
      },
    }
    return newCommands;
  },
})

