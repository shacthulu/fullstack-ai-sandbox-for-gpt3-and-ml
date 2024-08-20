/* eslint-disable react/jsx-indent-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputerMouse, faItalic, faTextSize, faUnderline } from '@fortawesome/pro-regular-svg-icons';
import * as Toolbar from './Toolbar';
import { useTextColorAction } from './useTextColorAction';

export default function TheToolbar() {
    const [editor] = useLexicalComposerContext();
    const onClickRed = useTextColorAction('red', editor);
    return (
        <Toolbar.Root>
            <Toolbar.Button
                onClick={() => {
                    // Do something
                    alert('Clicked!');
                }}
            >
                test
            </Toolbar.Button>
            <Toolbar.Button
                onClick={onClickRed}
            >
                Red text
            </Toolbar.Button>
            <Toolbar.Separator />
            <Toolbar.FormattingButton
                format="bold"
            >
                <FontAwesomeIcon icon={faTextSize} />
            </Toolbar.FormattingButton>
            <Toolbar.FormattingButton
                format="italic"
            >
                <FontAwesomeIcon icon={faItalic} />
            </Toolbar.FormattingButton>
            <Toolbar.FormattingButton
                format="underline"
            >
                <FontAwesomeIcon icon={faUnderline} />
            </Toolbar.FormattingButton>

        </Toolbar.Root>
    );
}
