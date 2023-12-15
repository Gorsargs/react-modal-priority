import { ReactPortal } from '@/components/ReactPortal';
import { PropsWithChildren, createContext, useContext, useState, useRef } from 'react';
import { CurrentModalProvider } from './CurrentModalContext';
import { ModalContainer } from '@/components/ModalContainer';
import ModalSystem, { ModalId } from '@/ModalSystem/ModalSystem';
import { ComponentPropsType, Modal, ModalParams } from '@/ModalSystem/Modal';
import { ExternalModalController } from '@/components/ExternalModalController';
import { useFocusLastElement } from '@/helpers';

type ModalContext = {
  addModal: <T extends ComponentPropsType>(newModal: ModalParams<T>) => void;
  removeModal: (modalId: ModalId) => void;
  getModals: () => Modal[];
};

const ModalContext = createContext<ModalContext>({
  addModal: () => {},
  removeModal: () => {},
  getModals: () => [],
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<Modal[]>([]);
  const { current: modalSystem } = useRef(new ModalSystem(setModals));

  useFocusLastElement(modals);

  // const memoizedContextValue: ModalContext = useMemo(() => {
  //   return {
  //     getModals: modalSystem.getModals,
  //     addModal: modalSystem.addModal,
  //     removeModal: modalSystem.removeModal,
  //     hideModal: modalSystem.hideModal,
  //   };
  //   // we don't need this functions to be rerendered since it will cause the whole app to rerender
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <ModalContext.Provider value={modalSystem}>
      <ReactPortal>
        {modals.map((modal) => {
          return (
            <CurrentModalProvider modal={modal} key={modal.id}>
              {!modal.externalModal ? (
                <ModalContainer
                  {...modal.containerProps}
                  key={modal.id}
                  Component={modal.component}
                  componentProps={modal.componentProps}
                  isVisible={modal.visible}
                />
              ) : (
                <ExternalModalController
                  Component={modal.component}
                  componentProps={modal.componentProps}
                  isVisible={modal.visible}
                />
              )}
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

  if (!context) {
    throw new Error('useModalContext must be used inside the ModalProvider');
  }

  return context;
};
