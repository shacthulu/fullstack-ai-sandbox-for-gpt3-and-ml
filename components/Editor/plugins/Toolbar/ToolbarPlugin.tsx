/* eslint-disable react/style-prop-object */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { LexicalEditor, NodeKey } from 'lexical';

import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
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
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { Divider } from '@mantine/core';
import catTypingGif from '../../images/cat-typing.gif';
import { getSelectedNode } from '../../utils/getSelectNode';
// import {$createStickyNode} from '../../nodes/StickyNode';
// import DropDown, {DropDownItem} from '../../ui/DropDown';
// import DropdownColorPicker from '../../ui/DropdownColorPicker';
import { sanitizeUrl } from '../../utils/url';
import { BlockFormatDropDown } from './BlockDropDown/BlockDropDown';
import { FontDropDown } from './FontDropDown/FontDropDown';
import { CodeTypeDropDown } from './CodeTypeDropDown/CodeTypeDropDown';
// import {EmbedConfigs} from '../AutoEmbedPlugin';
// import {INSERT_COLLAPSIBLE_COMMAND} from '../CollapsiblePlugin';
// import {InsertEquationDialog} from '../EquationsPlugin';
// import {INSERT_EXCALIDRAW_COMMAND} from '../ExcalidrawPlugin';
// import {
//   INSERT_IMAGE_COMMAND,
//   InsertImageDialog,
//   InsertImagePayload,
// } from '../ImagesPlugin';
// import {InsertPollDialog} from '../PollPlugin';
// import {InsertNewTableDialog, InsertTableDialog} from '../TablePlugin';

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

export default function ToolbarPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState(editor);
    const [blockType, setBlockType] =
      useState<keyof typeof blockTypeToBlockName>('paragraph');
    const [rootType, setRootType] =
      useState<keyof typeof rootTypeToRootName>('root');
    const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
      null,
    );
    const [fontSize, setFontSize] = useState<string>('15px');
    const [fontColor, setFontColor] = useState<string>('#000');
    const [bgColor, setBgColor] = useState<string>('#fff');
    const [fontFamily, setFontFamily] = useState<string>('Arial');
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isSubscript, setIsSubscript] = useState(false);
    const [isSuperscript, setIsSuperscript] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    // const [modal, showModal] = useModal();
    const [isRTL, setIsRTL] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState<string>('');
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const IS_APPLE : boolean = false;
  
    const $updateToolbar = useCallback(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        let element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
              });
  
        if (element === null) {
          element = anchorNode.getTopLevelElementOrThrow();
        }
  
        const elementKey = element.getKey();
        const elementDOM = activeEditor.getElementByKey(elementKey);
  
        // Update text format
        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsSubscript(selection.hasFormat('subscript'));
        setIsSuperscript(selection.hasFormat('superscript'));
        setIsCode(selection.hasFormat('code'));
        setIsRTL($isParentElementRTL(selection));
  
        // Update links
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        if ($isLinkNode(parent) || $isLinkNode(node)) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }
  
        const tableNode = $findMatchingParent(node, $isTableNode);
        if ($isTableNode(tableNode)) {
          setRootType('table');
        } else {
          setRootType('root');
        }
  
        if (elementDOM !== null) {
          setSelectedElementKey(elementKey);
          if ($isListNode(element)) {
            const parentList = $getNearestNodeOfType<ListNode>(
              anchorNode,
              ListNode,
            );
            const type = parentList
              ? parentList.getListType()
              : element.getListType();
            setBlockType(type);
          } else {
            const type = $isHeadingNode(element)
              ? element.getTag()
              : element.getType();
            if (type in blockTypeToBlockName) {
              setBlockType(type as keyof typeof blockTypeToBlockName);
            }
            if ($isCodeNode(element)) {
              const language =
                element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
              setCodeLanguage(
                language ? CODE_LANGUAGE_MAP[language] || language : '',
              );
              return;
            }
          }
        }
        // Handle buttons
        setFontSize(
          $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
        );
        setFontColor(
          $getSelectionStyleValueForProperty(selection, 'color', '#000'),
        );
        setBgColor(
          $getSelectionStyleValueForProperty(
            selection,
            'background-color',
            '#fff',
          ),
        );
        setFontFamily(
          $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
        );
      }
    }, [activeEditor]);
  
    useEffect(() => editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          $updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ), [editor, $updateToolbar]);
  
    useEffect(() => mergeRegister(
        editor.registerEditableListener((editable) => {
          setIsEditable(editable);
        }),
        activeEditor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            $updateToolbar();
          });
        }),
        activeEditor.registerCommand<boolean>(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        ),
        activeEditor.registerCommand<boolean>(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        ),
      ), [$updateToolbar, activeEditor, editor]);
  
    useEffect(() => activeEditor.registerCommand(
        KEY_MODIFIER_COMMAND,
        (payload) => {
          const event: KeyboardEvent = payload;
          const { code, ctrlKey, metaKey } = event;
  
          if (code === 'KeyK' && (ctrlKey || metaKey)) {
            event.preventDefault();
            return activeEditor.dispatchCommand(
              TOGGLE_LINK_COMMAND,
              sanitizeUrl('https://'),
            );
          }
          return false;
        },
        COMMAND_PRIORITY_NORMAL,
      ), [activeEditor, isLink]);
  
    const applyStyleText = useCallback(
      (styles: Record<string, string>) => {
        activeEditor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, styles);
          }
        });
      },
      [activeEditor],
    );
  
    const clearFormatting = useCallback(() => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const { anchor } = selection;
          const { focus } = selection;
          const nodes = selection.getNodes();
  
          if (anchor.key === focus.key && anchor.offset === focus.offset) {
            return;
          }
  
          nodes.forEach((node, idx) => {
            // We split the first and last node by the selection
            // So that we don't format unselected text inside those nodes
            if ($isTextNode(node)) {
              if (idx === 0 && anchor.offset !== 0) {
                node = node.splitText(anchor.offset)[1] || node;
              }
              if (idx === nodes.length - 1) {
                node = node.splitText(focus.offset)[0] || node;
              }
  
              if (node.__style !== '') {
                node.setStyle('');
              }
              if (node.__format !== 0) {
                node.setFormat(0);
                $getNearestBlockElementAncestorOrThrow(node).setFormat('');
              }
            } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
              node.replace($createParagraphNode(), true);
            } else if ($isDecoratorBlockNode(node)) {
              node.setFormat('');
            }
          });
        }
      });
    }, [activeEditor]);
  
    const onFontColorSelect = useCallback(
      (value: string) => {
        applyStyleText({ color: value });
      },
      [applyStyleText],
    );
  
    const onBgColorSelect = useCallback(
      (value: string) => {
        applyStyleText({ 'background-color': value });
      },
      [applyStyleText],
    );
  
    const insertLink = useCallback(() => {
      if (!isLink) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
      } else {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      }
    }, [editor, isLink]);
  
    const onCodeLanguageSelect = useCallback(
      (value: string) => {
        activeEditor.update(() => {
          if (selectedElementKey !== null) {
            const node = $getNodeByKey(selectedElementKey);
            if ($isCodeNode(node)) {
              node.setLanguage(value);
            }
          }
        });
      },
      [activeEditor, selectedElementKey],
    );
    // const insertGifOnClick = (payload: InsertImagePayload) => {
    //   activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    // };
  
    return (
      <div className="toolbar">
        <button
          disabled={!canUndo || !isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
          type="button"
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <i className="format undo" />
        </button>
        <button
          disabled={!canRedo || !isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
          type="button"
          className="toolbar-item"
          aria-label="Redo"
        >
          <i className="format redo" />
        </button>
        <Divider />
        {blockType in blockTypeToBlockName && activeEditor === editor && (
          <>
            <BlockFormatDropDown
              disabled={!isEditable}
              blockType={blockType}
              rootType={rootType}
              editor={editor}
            />
            <Divider />
          </>
        )}
        {blockType === 'code' ? (
          // <DropDown
          //   disabled={!isEditable}
          //   buttonClassName="toolbar-item code-language"
          //   buttonLabel={getLanguageFriendlyName(codeLanguage)}
          //   buttonAriaLabel="Select language"
          // >
          //   {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
          //       <DropDownItem
          //         className={`item ${dropDownActiveClass(
          //           value === codeLanguage,
          //         )}`}
          //         onClick={() => onCodeLanguageSelect(value)}
          //         key={value}
          //       >
          //         <span className="text">{name}</span>
          //       </DropDownItem>
          //     ))}
          // </DropDown>
        <CodeTypeDropDown editor={editor} style="" />
        ) : (
          <>
            <FontDropDown
              disabled={!isEditable}
              style="font-family"
              value={fontFamily}
              editor={editor}
            />
            <FontDropDown
              disabled={!isEditable}
              style="font-size"
              value={fontSize}
              editor={editor}
            />
            <Divider />
            <button
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
              }}
              className={`toolbar-item spaced ${isBold ? 'active' : ''}`}
              title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
              type="button"
              aria-label={`Format text as bold. Shortcut: ${
                IS_APPLE ? '⌘B' : 'Ctrl+B'
              }`}
            >
              <i className="format bold" />
            </button>
            <button
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
              }}
              className={`toolbar-item spaced ${isItalic ? 'active' : ''}`}
              title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
              type="button"
              aria-label={`Format text as italics. Shortcut: ${
                IS_APPLE ? '⌘I' : 'Ctrl+I'
              }`}
            >
              <i className="format italic" />
            </button>
            <button
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
              }}
              className={`toolbar-item spaced ${isUnderline ? 'active' : ''}`}
              title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
              type="button"
              aria-label={`Format text to underlined. Shortcut: ${
                IS_APPLE ? '⌘U' : 'Ctrl+U'
              }`}
            >
              <i className="format underline" />
            </button>
            <button
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
              }}
              className={`toolbar-item spaced ${isCode ? 'active' : ''}`}
              title="Insert code block"
              type="button"
              aria-label="Insert code block"
            >
              <i className="format code" />
            </button>
            <button
              disabled={!isEditable}
              onClick={insertLink}
              className={`toolbar-item spaced ${isLink ? 'active' : ''}`}
              aria-label="Insert link"
              title="Insert link"
              type="button"
            >
              <i className="format link" />
            </button>
          </>
        )}
      </div>
    );
  }
