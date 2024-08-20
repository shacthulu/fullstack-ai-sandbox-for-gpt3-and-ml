/* eslint-disable react/jsx-indent-props */
import { faFlaskVial } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex } from '@mantine/core';


import React from 'react';



interface ITreeViewButtonProps {
    showTreeView: () => void;
}

export default function ShowTreeViewButton(props: ITreeViewButtonProps) {
    return (
        <Flex
            justify="flex-start"
            align="flex-start"
            style={{
                position: 'absolute',
                bottom: 0,

            }}
        >
            <Button
                variant="light"
                compact
                onClick={props.showTreeView}
            >
                <FontAwesomeIcon icon={faFlaskVial} />
            </Button>
        </Flex>
    );
}
