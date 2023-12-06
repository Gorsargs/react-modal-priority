import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { createWrapperAndAppendToBody } from '@/helpers';

interface IReactPortal {
  children: React.ReactNode | React.ReactNode[];
  wrapperId: string;
}

function ReactPortal({ children, wrapperId = 'react-portal-wrapper' }: IReactPortal) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
