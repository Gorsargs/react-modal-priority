import React from 'react';
import { FocusTrap } from '@/components/FocusTrap';
import { ComponentPropsType, ComponentType } from '@/core/Modal/Modal';

type Placement = 'start' | 'end' | 'center';

interface stylesInterface {
  container: React.CSSProperties;
  vertical__center: React.CSSProperties;
  vertical__start: React.CSSProperties;
  vertical__end: React.CSSProperties;
  horizontal__center: React.CSSProperties;
  horizontal__end: React.CSSProperties;
  horizontal__start: React.CSSProperties;
}

const styles: stylesInterface = {
  container: {
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
  },

  vertical__center: {
    alignItems: 'center',
  },

  vertical__start: {
    alignItems: 'start',
  },

  vertical__end: {
    alignItems: 'end',
  },

  horizontal__start: {
    justifyContent: 'start',
  },

  horizontal__end: {
    justifyContent: 'end',
  },

  horizontal__center: {
    justifyContent: 'center',
  },
};

export type ComponentWithProps<T extends ComponentPropsType = any> = {
  Component: ComponentType;
  componentProps: React.ComponentProps<T>;
};

export interface IModalContainerProps {
  verticalPlacement?: Placement;
  horizontalPlacement?: Placement;
  classNames?: string;
  inlineStyle?: React.CSSProperties;
  isVisible?: boolean;
}

const ModalContainer: React.FC<IModalContainerProps & ComponentWithProps> = ({
  Component,
  componentProps,
  horizontalPlacement = 'center',
  verticalPlacement = 'center',
  classNames = '',
  inlineStyle,
  isVisible = true,
}) => {
  const vPlacement = styles[`vertical__${verticalPlacement}`];
  const hPlacement = styles[`horizontal__${horizontalPlacement}`];
  return (
    <div
      className={classNames}
      aria-hidden
      style={{
        zIndex: 1000,
        ...vPlacement,
        ...hPlacement,
        ...styles.container,
        ...inlineStyle,
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <FocusTrap>
        <Component {...componentProps} />
      </FocusTrap>
    </div>
  );
};

export default React.memo(ModalContainer);
