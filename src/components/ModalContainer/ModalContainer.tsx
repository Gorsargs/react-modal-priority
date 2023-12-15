import React from 'react';
import styles from './ModalContainer.module.css';
import { FocusTrap } from '../FocusTrap';
import { ComponentPropsType } from '@/components/core/Modal/Modal';

type Placement = 'start' | 'end' | 'center';

export type ComponentWithProps<T extends ComponentPropsType = any> = {
  Component: React.FC;
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
  classNames,
  inlineStyle,
  isVisible,
}) => {
  const vPlacement = styles[`vertical__${verticalPlacement}`];
  const hPlacement = styles[`horizontal__${horizontalPlacement}`];
  return (
    <div
      className={`${styles.container} ${vPlacement} ${hPlacement} ${classNames} backdrop-blur`}
      aria-hidden
      style={{ zIndex: 1000, ...inlineStyle, visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <FocusTrap>
        <Component {...componentProps} />
      </FocusTrap>
    </div>
  );
};

export default React.memo(ModalContainer);
