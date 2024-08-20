/* eslint-disable react/jsx-indent-props */
import { faPaperPlane } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex } from '@mantine/core';

import React from 'react';



interface ISendMessageProps {
    sendChat: () => void;
}

export default function SendMessage(props: ISendMessageProps) {
    return (
        <Flex
            justify="flex-end"
            align="flex-end"
            style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}
        >
            <Button
                variant="light"
                compact
                onClick={props.sendChat}
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
        </Flex>
    );
}
