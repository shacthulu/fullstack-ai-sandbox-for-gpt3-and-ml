/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LexicalEditor, NodeKey } from 'lexical';
import { Button, Menu, Select } from '@mantine/core';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFont, faH1, faH2, faH3, faH4, faH5, faH6, faList, faListOl, faParagraph, faQuoteLeft, faSquareCheck, faSquareCode } from '@fortawesome/pro-regular-svg-icons';
import { IconH1, IconH2, IconH3, IconQuote } from '@tabler/icons';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { MenuDivider } from '@mantine/core/lib/Menu/MenuDivider/MenuDivider';


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

const blockTypeToIcon = {
    bullet: <FontAwesomeIcon icon={faList} />,
    check: <FontAwesomeIcon icon={faSquareCheck} />,
    code: <FontAwesomeIcon icon={faSquareCode} />,
    h1: <FontAwesomeIcon icon={faH1} />,
    h2: <FontAwesomeIcon icon={faH2} />,
    h3: <FontAwesomeIcon icon={faH3} />,
    h4: <FontAwesomeIcon icon={faH4} />,
    h5: <FontAwesomeIcon icon={faH5} />,
    h6: <FontAwesomeIcon icon={faH6} />,
    number: <FontAwesomeIcon icon={faListOl} />,
    paragraph: <FontAwesomeIcon icon={faParagraph} />,
    quote: <FontAwesomeIcon icon={faQuoteLeft} />,
};

const rootTypeToRootName = {
    root: 'Root',
    table: 'Table',
};

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

function getCodeLanguageOptions(): [string, string][] {
    return Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP);
  }
  
  
  const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

export function CodeTypeDropDown({
    editor,
    style,
    disabled = false,
}: {
    editor: LexicalEditor;
    // value: string;
    style: string;
    disabled?: boolean;
}): JSX.Element {
    const handleClick = useCallback(
        (option: string) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $patchStyleText(selection, {
                        [style]: option,
                    });
                }
            });
        },
        [editor, style],
    );

    const buttonAriaLabel =
        style === 'font-family'
            ? 'Formatting options for font family'
            : 'Formatting options for font size';

            // <DropDown
            //   disabled={!isEditable}
            //   buttonClassName="toolbar-item code-language"
            //   buttonLabel={getLanguageFriendlyName(codeLanguage)}
            //   buttonAriaLabel="Select language"
            // >
            // {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
            //     <DropDownItem
            //       className={`item ${dropDownActiveClass(
            //         value === codeLanguage,
            //       )}`}
            //       onClick={() => onCodeLanguageSelect(value)}
            //       key={value}
            //     >
            //       <span className="text">{name}</span>
            //     </DropDownItem>
            //   ))}
            // </DropDown>;
    
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button disabled={disabled} className="toolbar-item code-type">
                    <FontAwesomeIcon icon={faCode} />
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
            {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
                        <Menu.Item
                          onClick={() => handleClick(value)}
                          key={value}
                        >
                            <span className="codeLabel">{getLanguageFriendlyName(value)}</span>
                        </Menu.Item>
                    ),
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
