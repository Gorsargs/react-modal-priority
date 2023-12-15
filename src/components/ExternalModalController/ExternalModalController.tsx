import { useCurrentModal } from '@/context/CurrentModalContext';
import { ComponentWithProps } from '@components/ModalContainer/ModalContainer';
import { Modal as AntdModal } from 'antd';
import React, { ComponentProps, useEffect, useRef, useState } from 'react';

export const antdModalResolver = (id: string): ComponentProps<typeof AntdModal> => {
  const containerElement = document.getElementById(`container_${id}`);
  return {
    getContainer: containerElement,
    zIndex: 1000,
  };
};

type IExternalModalControllerPropsType = {
  isVisible: boolean;
  resolver?: () => any;
} & ComponentWithProps;

const ExternalModalController: React.FC<IExternalModalControllerPropsType> = ({
  Component,
  componentProps,
  isVisible,
  //resolver,
}) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const { closeModal, modal } = useCurrentModal();

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  return (
    <div id={`container_${modal.id}`} ref={wrapperRef} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      <Component
        {...componentProps}
        {...antdModalResolver(modal.id)}
        open={open}
        onCancel={() => {
          componentProps?.onCancel ? componentProps.onCancel() : {};
          setOpen(false);
        }}
        afterClose={() => {
          componentProps?.afterClose ? componentProps.afterClose() : {};
          closeModal();
        }}
        destroyOnClose={!modal.keepMounted}
      />
    </div>
  );
};

export default React.memo(ExternalModalController);
