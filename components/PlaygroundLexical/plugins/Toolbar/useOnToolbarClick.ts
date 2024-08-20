/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-template */
/* eslint-disable no-console */


import * as React from 'react';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from '@lexical/code';
import {
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
} from '@lexical/link';
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from '@lexical/rich-text';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
  $wrapNodes,
  $isAtNodeEnd,
} from '@lexical/selection';
import { $isTableNode } from '@lexical/table';
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';


const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
};
  
const rootTypeToRootName = {
    root: 'Root',
    table: 'Table',
};
  
// ! The below was the original function which seems asinine and causes iterator/generator errors. Why not just return the entries? I've changed it to do that.
// function getCodeLanguageOptions(): [string, string][] {
//     const options: [string, string][] = [];
//     for (const [lang, friendlyName] of Object.entries(
//       CODE_LANGUAGE_FRIENDLY_NAME_MAP,
//     )) {
//       options.push([lang, friendlyName]);
//     }
//       return options;
//   }

function getCodeLanguageOptions(): [string, string][] {
    return Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP);
  }

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();
  

  const FONT_FAMILY_OPTIONS: [string, string][] = [
    ['Arial', 'Arial'],
    ['Courier New', 'Courier New'],
    ['Georgia', 'Georgia'],
    ['Times New Roman', 'Times New Roman'],
    ['Trebuchet MS', 'Trebuchet MS'],
    ['Verdana', 'Verdana'],
  ];
  
  const FONT_SIZE_OPTIONS: [string, string][] = [
    ['10px', '10px'],
    ['11px', '11px'],
    ['12px', '12px'],
    ['13px', '13px'],
    ['14px', '14px'],
    ['15px', '15px'],
    ['16px', '16px'],
    ['17px', '17px'],
    ['18px', '18px'],
    ['19px', '19px'],
    ['20px', '20px'],
  ];


  
export default function useOnToolbarClick() {
    const [editor] = useLexicalComposerContext();
    // const [blockType, setBlockType] = useState<string>('paragraph');
    // const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
    
    function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) {
        console.log('onClick action:' + action);
        switch (action) {
            case 'toggle_bold':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                break;
            case 'toggle_italic':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                break;
            case 'clear_formatting':
                // Add the code for "clear_formatting" action
                break;
            case 'toggle_highlight':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
                break;
            case 'toggle_strikethrough':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
                break;
            case 'toggle_code':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
                break;
            case 'toggle_subscript':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
                break;
            case 'toggle_superscript':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
                break;
            case 'toggle_underline':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                break;
            case 'insert_snippet':
                // Here add the code for 'insert_snippet' action
                break;
            case 'add_context':
                // Here add the code for 'add_context' action
                break;
            case 'add_intent':
                // Here add the code for 'add_intent' action
                break;
            case 'add_smart_token':
                // Here add the code for 'add_smart_token' action
                break;
            case 'dropdown_person':
                // Here add the code for 'dropdown_person' action
                break;
            case 'dropdown_place':
                // Here add the code for 'dropdown_place' action
                break;
            case 'dropdown_entity':
                // Here add the code for 'dropdown_entity' action
                break;
            case 'fork_conversation':
                // Here add the code for 'fork_conversation' action
                break;
            case 'save_draft':
                // Here add the code for 'save_draft' action
                break;
            case 'edit_library':
                // Here add the code for 'edit_library' action
                break;
            case 'edit_profile':
                // Here add the code for 'edit_profile' action
                break;
            case 'edit_table':
                // Here add the code for 'edit_table' action
                break;
            case 'import_file':
                // Here add the code for 'import_file' action
                break;
            default:
                console.log('Action not found!');
        }
    }
    return onClick;
}
