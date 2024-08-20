
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBold, faBoltAuto, faBookSparkles, faChartNetwork, faCode, faFaceClouds, faFileImport, faFloppyDiskCircleArrowRight, faFolderBookmark, faHighlighterLine, faItalic, faLocationDot, faPerson, faSubscript, faSuperscript, faTable, faTextSlash, faUnderline, faVestPatches } from '@fortawesome/pro-regular-svg-icons';

interface IPluginButtonProps {
    name: string;
    icon: JSX.Element;
    action: string;
    id: string;
}

export const pluginsList : IPluginButtonProps[] = [
    {
        name: 'Important',
        icon: <FontAwesomeIcon icon={faBold} />,
        action: 'toggle_bold',
        id: 'toggle_bold',
    },
    {
        name: 'Emphasized',
        icon: <FontAwesomeIcon icon={faItalic} />,
        action: 'toggle_italic',
        id: 'toggle_italic',
    },
    {
        name: 'Clear Formatting',
        icon: <FontAwesomeIcon icon={faTextSlash} />,
        action: 'clear_formatting',
        id: 'clear_formatting',
    },
    {
        name: 'Insert Snippet',
        icon: <FontAwesomeIcon icon={faFolderBookmark} />,
        action: 'insert_snippet',
        id: 'insert_snippet',
    },
    {
        name: 'Code',
        icon: <FontAwesomeIcon icon={faCode} />,
        action: 'toggle_code',
        id: 'toggle_code',
    },
    {
        name: 'Add Context',
        icon: <FontAwesomeIcon icon={faChartNetwork} />,
        action: 'add_context',
        id: 'add_context',
    },
    {
        name: 'Add Intent',
        icon: <FontAwesomeIcon icon={faVestPatches} />,
        action: 'add_intent',
        id: 'add_intent',
    },
    {
        name: 'Add Smart Token',
        icon: <FontAwesomeIcon icon={faBoltAuto} />,
        action: 'add_smart_token',
        id: 'add_smart_token',
    },
    {
        name: 'Person',
        icon: <FontAwesomeIcon icon={faPerson} />,
        action: 'dropdown_person',
        id: 'dropdown_person',
    },
    {
        name: 'Place',
        icon: <FontAwesomeIcon icon={faLocationDot} />,
        action: 'dropdown_place',
        id: 'dropdown_place',
    },
    {
        name: 'Other Entity',
        icon: <FontAwesomeIcon icon={faFaceClouds} />,
        action: 'dropdown_entity',
        id: 'dropdown_entity',
    },
    {
        name: 'Fork Conversation',
        icon: <FontAwesomeIcon icon={faFaceClouds} />,
        action: 'fork_conversation',
        id: 'fork_conversation',
    },
    {
        name: 'Save Draft',
        icon: <FontAwesomeIcon icon={faFloppyDiskCircleArrowRight} />,
        action: 'save_draft',
        id: 'save_draft',
    },
    {
        name: 'Library',
        icon: <FontAwesomeIcon icon={faBookSparkles} />,
        action: 'edit_library',
        id: 'edit_library',
    },
    {
        name: 'Profile',
        icon: <FontAwesomeIcon icon={faAddressCard} />,
        action: 'edit_profile',
        id: 'edit_profile',
    },
    {
        name: 'table',
        icon: <FontAwesomeIcon icon={faTable} />,
        action: 'edit_table',
        id: 'edit_table',
    },
    {
        name: 'Import File',
        icon: <FontAwesomeIcon icon={faFileImport} />,
        action: 'import_file',
        id: 'import_file',
    },
    {
        name: 'Underline',
        icon: <FontAwesomeIcon icon={faUnderline} />,
        action: 'toggle_underline',
        id: 'toggle_underline',
    },
    {
        name: 'Superscript',
        icon: <FontAwesomeIcon icon={faSuperscript} />,
        action: 'toggle_superscript',
        id: 'toggle_superscript',
    },
    {
        name: 'Subscript',
        icon: <FontAwesomeIcon icon={faSubscript} />,
        action: 'toggle_subscript',
        id: 'toggle_subscript',
    },
    {
        name: 'Highlight',
        icon: <FontAwesomeIcon icon={faHighlighterLine} />,
        action: 'toggle_highlight',
        id: 'toggle_highlight',
    },
];


export const activePluginsList: string[] = [
    'toggle_bold',
    'toggle_italic',
    'clear_formatting',
    'toggle_code',
    'fork_conversation',
    'save_draft',
    'edit_library',
    'edit_profile',
    'edit_table',
    'import_file',
    'toggle_underline',
    'toggle_superscript',
    'toggle_subscript',
    'toggle_highlight',
];
