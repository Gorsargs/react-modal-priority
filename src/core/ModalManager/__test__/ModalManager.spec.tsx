import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ModalManager } from '@/core/ModalManager';
import { Modal } from '@/core/Modal'; // Adjust import paths as necessary
// Mock Modal for simplicity

describe('ModalManager', () => {
  let modalManager: ModalManager;
  let setStateMock: any;

  beforeEach(() => {
    vi.useFakeTimers();
    setStateMock = vi.fn();
    modalManager = new ModalManager(setStateMock);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds and retrieves a modal', () => {
    const testModal = new Modal({ component: () => <div>Test</div> });
    modalManager.showModal(testModal);
    const modalsArray = modalManager.getModals();
    expect(modalsArray.map((modal) => modal.id)).toContain(testModal.id);
  });

  it('removes a modal', () => {
    const testModal = new Modal({ component: () => <div>Test</div>, id: 'removeTest' });
    modalManager.showModal(testModal);
    modalManager.closeModal('removeTest');
    expect(modalManager.getModals()).not.toContain(testModal);
  });

  it('removes a interval modal', () => {
    const testModalInterval = new Modal({ component: () => <div>Test</div>, id: 'removeTestInterval', interval: 1000 });
    modalManager.showModal(testModalInterval);
    modalManager.closeModal('removeTestInterval');
    expect(modalManager.getModals()).not.toContain(testModalInterval);
  });

  it('handles keepMounted on closeModal', () => {
    const testModal = new Modal({ component: () => <div>Test</div>, id: 'keepMountedTest', keepMounted: true });
    modalManager.showModal(testModal);
    modalManager.closeModal('keepMountedTest');
    expect(modalManager.getModals().find((modal) => modal.id === 'keepMountedTest')?.visible).toBe(false);
  });

  it('deletes interval modal correctly', () => {
    const intervalModal = new Modal({ component: () => <div>Interval</div>, id: 'intervalId', interval: 1000 });
    modalManager.showModal(intervalModal);
    modalManager.deleteIntervalModal('intervalId');
    expect(modalManager.getModals()).not.toContain(intervalModal);
  });

  it('adds interval modal back correctly', async () => {
    const intervalModal = new Modal({ component: () => <div>Interval</div>, id: 'intervalId', interval: 1000 });
    modalManager.showModal(intervalModal);
    modalManager.deleteIntervalModal('intervalId');
    modalManager['addIntervalModalBack'](intervalModal);

    vi.runAllTimers();

    expect(modalManager.getModals().map((modal) => modal.id)).toContain(intervalModal.id);
  });

  it('sorts modals by priority correctly', () => {
    const lowPriorityModal = new Modal({ component: () => <div>Low</div>, priority: 1 });
    const highPriorityModal = new Modal({ component: () => <div>High</div>, priority: 10 });
    modalManager.showModal(lowPriorityModal);
    modalManager.showModal(highPriorityModal);
    const modals = modalManager.getModals();
    expect(modals[0].priority).toBeLessThan(modals[1].priority);
  });

  it('changes visibility of a modal correctly', () => {
    const modal = new Modal({ component: () => <div>modal</div> });
    modal.visible = false;
    modalManager['changeVisibility'](modal, true);
    expect(modal.visible).toBe(true);

    modalManager['changeVisibility'](modal, false);
    expect(modal.visible).toBe(false);
  });

  it('adds interval modals with options keep mounted back correctly', async () => {
    const modalId = 'intervalIdKeepMounted';
    const intervalModalKeepMounted = new Modal({
      component: () => <div>modal</div>,
      id: modalId,
      keepMounted: true,
      interval: 1000,
    });
    intervalModalKeepMounted.visible = true;
    modalManager.showModal(intervalModalKeepMounted);
    modalManager.closeModal(modalId);
    modalManager['addIntervalModalBackKeepMounted'](intervalModalKeepMounted);

    vi.runAllTimers();
    expect(intervalModalKeepMounted.visible).toBe(true);
    expect(modalManager.getModals().map((modal) => modal.id)).toContain(intervalModalKeepMounted.id);
  });

  it('doesnt add existing modal in the modals array', () => {
    const modal = new Modal({ component: () => <div>modal</div>, id: 'existingModal' });
    const existingModal = modal;

    modalManager.showModal(modal);
    modalManager.showModal(existingModal);

    expect(modalManager.getModals().length).toBe(1);
  });

  it('does nothing when try to delete not existing modal from the modals array', () => {
    modalManager.closeModal('not existing modal id');
    expect(modalManager.getModals().length).toBe(0);
  });
});
