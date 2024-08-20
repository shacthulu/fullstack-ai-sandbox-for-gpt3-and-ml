// EmoticonPlugin.js

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TextNode } from 'lexical';
import { useEffect } from 'react';
import { $createEmoticonNode } from '../nodes/EmoticonNode';

function emoticonTransform(node:any) {
    const textContent = node.getTextContent();
    if (textContent === ':)') {
      node.replace($createEmoticonNode('', '🙂'));
    }
  }
  
function useEmoticons(editor:any) {
    useEffect(() => {
      const removeTransform = editor.registerNodeTransform(TextNode, emoticonTransform);
      return () => {
        removeTransform();
      };
    }, [editor]);
  }
  
  export default function EmoticonPlugin() {
    const [editor] = useLexicalComposerContext();
    useEmoticons(editor);
    return null;
  }
