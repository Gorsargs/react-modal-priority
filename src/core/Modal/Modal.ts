import { ModalId } from '../ModalManager/ModalManager';
import { CSSProperties, ComponentClass, ComponentProps, FunctionComponent, JSXElementConstructor } from 'react';
import { IModalContainerProps } from '@/components/ModalContainer/ModalContainer';
import { PortalContainer } from '@/components/ReactPortal/ReactPortal';
import shortid from 'shortid';

export type ComponentType<P = any> = ComponentClass<P> | FunctionComponent<P>;

export type ComponentPropsType = JSXElementConstructor<any>;

export type ModalParams<T extends ComponentPropsType> = {
  id?: ModalId;
  component: ComponentType;
  componentProps?: ComponentProps<T>;
  priority?: number;
  interval?: number;
  superPriority?: boolean;
  inlineStyle?: React.CSSProperties;
  container?: PortalContainer;
  containerProps?: IModalContainerProps;
  keepMounted?: boolean;
};

export class Modal<T extends ComponentPropsType = any> {
  component: ComponentType;
  componentProps?: ComponentProps<T>;
  id?: string = shortid.generate();
  inlineStyle?: CSSProperties;
  interval?: number = 0;
  priority?: number = 0;
  superPriority?: boolean = false;
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
    superPriority = false,
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
    this.container = container;
    this.containerProps = containerProps;
    this.keepMounted = keepMounted;
    this.focus;
    if (this.superPriority) {
      this.priority = Infinity;
    }
  }
}
