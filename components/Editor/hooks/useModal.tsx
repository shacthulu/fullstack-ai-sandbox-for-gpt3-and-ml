import { useCallback, useMemo, useState } from 'react';
import * as React from 'react';
import Modal from '../ui/Modal';

interface IModalProps {
    title: string;
    content: React.ReactNode;
    closeOnClickOutside?: boolean;
}

export default function useModal() {
    const [modalContent, setModalContent] = useState<IModalProps | null>({ title: '', content: null, closeOnClickOutside: true });

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, closeOnClickOutside } = modalContent;
    return (
      <Modal
        onClose={onClose}
        title={title}
        open={!!modalContent}
        closeOnClickOutside={closeOnClickOutside}
      >
        {content}
      </Modal>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      title : string,
      // eslint-disable-next-line no-shadow
      getContent : (onClose : () => void) => React.ReactNode,
      closeOnClickOutside = false
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose]
  );

  return [modal, showModal];
}
