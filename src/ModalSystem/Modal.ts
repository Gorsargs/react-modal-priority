import { ModalId } from './ModalSystem';
import { CSSProperties, ComponentProps, JSXElementConstructor } from 'react';
import { IModalContainerProps } from '@/components/ModalContainer/ModalContainer';
import { PortalContainer } from '@/components/ReactPortal/ReactPortal';
import shortid from 'shortid';

export type ExternalModal = boolean;

type ComponentType = React.FC;

export type ComponentPropsType = JSXElementConstructor<any>;

export type ModalParams<T extends ComponentPropsType> = {
  id?: ModalId;
  component: ComponentType;
  componentProps?: ComponentProps<T>;
  priority?: number;
  interval?: number;
  superPriority?: boolean;
  inlineStyle?: React.CSSProperties;
  externalModal?: ExternalModal;
  container?: PortalContainer;
  containerProps?: IModalContainerProps;
  keepMounted?: boolean;
};

export class Modal<T extends ComponentPropsType = any> {
  component: ComponentType;
  componentProps?: ComponentProps<T>;
  id?: string;
  inlineStyle?: CSSProperties;
  interval?: number = 0;
  priority?: number = 0;
  superPriority?: boolean = false;
  externalModal?: boolean;
  container?: PortalContainer;
  containerProps?: IModalContainerProps;
  keepMounted?: boolean;
  visible?: boolean = true;
  focus?: boolean;

  constructor({
    component,
    containerProps,
    id = shortid.generate(),
    inlineStyle,
    interval = 0,
    priority = 0,
    superPriority,
    externalModal,
    container,
    componentProps,
    keepMounted = false,
  }: ModalParams<T>) {
    this.component = component;
    this.componentProps = componentProps;
    this.id = id;
    this.inlineStyle = inlineStyle;
    this.interval = interval;
    this.priority = priority;
    this.superPriority = superPriority;
    this.externalModal = externalModal;
    this.container = container;
    this.containerProps = containerProps;
    this.keepMounted = keepMounted;
    this.focus;
    if (this.superPriority) {
      this.priority = Infinity;
    }
  }
}
