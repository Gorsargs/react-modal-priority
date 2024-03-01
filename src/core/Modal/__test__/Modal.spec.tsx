import { describe, expect, it } from 'vitest';
import { Modal } from '@/core/Modal'; // Adjust the import path as necessary

describe('Modal', () => {
  it('creates a modal with default values when only component is provided', () => {
    const TestComponent = () => <div>Test</div>;
    const modal = new Modal({ component: TestComponent });

    expect(modal.id).toBeDefined();
    expect(modal.priority).toBe(0);
    expect(modal.interval).toBe(0);
    expect(modal.keepMounted).toBe(false);
    expect(modal.visible).toBe(true);
    expect(modal.superPriority).toBe(false);
  });

  it('sets priority to Infinity if superPriority is true', () => {
    const TestComponent = () => <div>Super Test</div>;
    const modal = new Modal({ component: TestComponent, superPriority: true });

    expect(modal.priority).toBe(Infinity);
  });

  it('assigns custom properties correctly during instantiation', () => {
    const CustomComponent = ({ className }: { className: string }) => <div className={className}>Custom</div>;
    const customProps = { className: 'test-className' };
    const inlineStyle = { backgroundColor: 'blue' };
    const modal = new Modal<typeof CustomComponent>({
      component: CustomComponent,
      componentProps: customProps,
      inlineStyle: inlineStyle,
      interval: 100,
      priority: 5,
      containerProps: { classNames: 'test-class' },
      keepMounted: true,
    });

    expect(modal.componentProps).toEqual(customProps);
    expect(modal.inlineStyle).toEqual(inlineStyle);
    expect(modal.interval).toBe(100);
    expect(modal.priority).toBe(5);
    expect(modal.containerProps).toEqual({ classNames: 'test-class' });
    expect(modal.keepMounted).toBe(true);
  });

  // Add more tests as needed...
});
