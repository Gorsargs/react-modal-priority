import React, { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { createWrapperAndAppendToBody } from '@/helpers';
import { RMP_MODAL_CONTAINER } from '@/constants/constants';

export type PortalContainer = string | HTMLElement;

interface IReactPortal {
  children: React.ReactNode | React.ReactNode[];
  wrapperId?: string;
  customStyles?: Record<string, string>;
}

function ReactPortal({ children, wrapperId = RMP_MODAL_CONTAINER, customStyles }: IReactPortal) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);

    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId, customStyles);
    }
    setWrapperElement(element);
  }, [wrapperId, customStyles]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
