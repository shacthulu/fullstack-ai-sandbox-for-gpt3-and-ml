/* eslint-disable max-len */
import * as React from 'react';
import { Box, Divider, Modal, Text } from '@mantine/core';

interface IModalProps {
    title: string;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    closeOnClickOutside?: boolean;
}

export default function ModalWrapper({ open, onClose, children, title, closeOnClickOutside = true }:IModalProps) {
  return (
    <div>
      <Modal
        opened={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeOnClickOutside={closeOnClickOutside}
        title={title}
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: 300, bgcolor: 'background.paper' }}>
          <Text
            sx={{ px: 1 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {title}
          </Text>
          <Divider />
          <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
      </Modal>
    </div>
  );
}
