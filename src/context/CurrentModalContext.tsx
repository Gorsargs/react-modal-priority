import React, { createContext, useContext, useMemo } from 'react';
import { usePriorityModal } from './ModalContext';
import { Modal } from '@/core/Modal/';

interface CurrentModalProvider {
  children: any;
  modal: Modal;
}

type CurrentModalContext = {
  closeModal: () => void;
  modal: Modal;
};

const CurrentModalContext = createContext<CurrentModalContext>({
  closeModal: () => {},
  modal: {} as Modal,
});

export const CurrentModalProvider: React.FC<CurrentModalProvider> = ({ children, modal }) => {
  const { closeModal } = usePriorityModal();

  const memoizedValue = useMemo(() => {
    return { closeModal: () => closeModal(modal.id || ''), modal };
  }, [closeModal, modal]);

  return <CurrentModalContext.Provider value={memoizedValue}>{children}</CurrentModalContext.Provider>;
};

export const useCurrentModal = () => {
  const context = useContext(CurrentModalContext);

  if (!context) {
    throw new Error('useCurrentModal must be used inside the CurrentModalProvider');
  }

  return context;
};
