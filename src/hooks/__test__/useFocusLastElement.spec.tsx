import { renderHook } from '@testing-library/react';
import { expect, it, describe, beforeEach, vitest, afterEach } from 'vitest';
import { useFocusLastElement } from '..';
import { RMP_MODAL_CONTAINER } from '@/constants/constants';
import { Modal } from '@/core/Modal';

const MockModal = () => <div>modal</div>;

describe('useFocusLastElement', () => {
  // Mock the environment
  const mockFocus = vitest.fn();
  beforeEach(() => {
    document.getElementById = vitest.fn().mockImplementation((id) => {
      if (id === RMP_MODAL_CONTAINER) {
        return {
          getElementsByClassName: () => [
            { focus: mockFocus }, // First modal
            { focus: mockFocus }, // Last modal, which should receive focus
          ],
        };
      }
      return null;
    });
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it('focuses on the last modal element when modals array changes', () => {
    const initialModals: Modal[] = [
      { id: 'modal1', component: MockModal },
      { id: 'modal2', component: MockModal },
    ];
    const { rerender } = renderHook(() => useFocusLastElement(initialModals));

    // Simulate adding a new modal
    const newModals: Modal[] = [...initialModals, { id: 'modal3', component: MockModal }];
    rerender(() => useFocusLastElement(newModals));

    expect(mockFocus).toHaveBeenCalledTimes(1); // Focus is called once upon re-render
  });

  it('does nothing when there are no modals', () => {
    document.getElementById = vitest.fn().mockReturnValue({
      getElementsByClassName: () => [],
    });

    renderHook(() => useFocusLastElement([]));

    expect(mockFocus).not.toHaveBeenCalled();
  });
});
