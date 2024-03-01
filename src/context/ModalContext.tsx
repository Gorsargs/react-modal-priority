import { ReactPortal } from '@/components/ReactPortal';
import { PropsWithChildren, createContext, useContext, useState, useRef } from 'react';
import { CurrentModalProvider } from './CurrentModalContext';
import { ModalContainer } from '@/components/ModalContainer';
import { ModalManager, IModalManager } from '@/core/ModalManager';
import { Modal } from '@/core/Modal';
import { useFocusLastElement } from '@/hooks';

const ModalContext = createContext<IModalManager>({
  showModal: () => {},
  closeModal: () => {},
  getModals: () => [],
  deleteIntervalModal: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<Modal[]>([]);
  const { current: modalManager } = useRef(new ModalManager(setModals));

  useFocusLastElement(modals);

  return (
    <ModalContext.Provider value={modalManager}>
      <ReactPortal>
        {modals.map((modal) => {
          return (
            <CurrentModalProvider modal={modal} key={modal.id}>
              <ModalContainer
                {...modal.containerProps}
                key={modal.id}
                Component={modal.component}
                componentProps={modal.componentProps}
                isVisible={modal.visible}
              />
            </CurrentModalProvider>
          );
        })}
      </ReactPortal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!(context instanceof ModalManager)) {
    throw new Error('useModalContext must be used inside the ModalProvider');
  }

  return context;
};
