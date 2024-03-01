import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, renderHook } from '@testing-library/react';
import { ModalProvider, usePriorityModal } from '@/context/ModalContext'; // Adjust the import path as necessary
import { ReactNode, useRef } from 'react';

describe('ModalProvider', () => {
  // Cleanup after each test to prevent any state leakage
  afterEach(cleanup);

  it('renders its children', () => {
    render(
      <ModalProvider>
        <div data-testid="test-child">Test Child</div>
      </ModalProvider>,
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('provides modal management functions through usePriorityModal', () => {
    // A test component to consume context
    const TestComponent = () => {
      const { showModal, closeModal, getModals } = usePriorityModal();
      const inputRef = useRef<HTMLInputElement>(null);

      const handleCloseModal = () => {
        //setting innerText in handleClick because getModals funciton is not reactive but will return the latest value at the time
        closeModal('modal-id');
        if (inputRef.current) inputRef.current.value = getModals().length.toString();
      };

      const handleAddModal = () => {
        showModal({
          component: () => <div></div>,
          id: 'modal-id',
        });
        if (inputRef.current) inputRef.current.value = getModals().length.toString();
      };

      return (
        <div>
          <button onClick={handleAddModal}>Show Modal</button>
          <button onClick={handleCloseModal}>Close Modal</button>
          <input data-testid="modals-count" ref={inputRef} value={getModals().length} />
        </div>
      );
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    expect(screen.getByTestId('modals-count')).toHaveValue('0');
    fireEvent.click(screen.getByText('Show Modal'));
    expect(screen.getByTestId('modals-count')).toHaveValue('1');
    fireEvent.click(screen.getByText('Close Modal'));
    expect(screen.getByTestId('modals-count')).toHaveValue('0');
  });

  it('throws an error when used outside of the ModalProvider', () => {
    const TestComponent = () => {
      usePriorityModal();
      return <div></div>;
    };

    expect(() => render(<TestComponent />)).toThrow('usePriorityModal must be used inside the ModalProvider');
  });

  it('returns context value when used inside the ModalProvider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <ModalProvider>{children}</ModalProvider>;
    const { result } = renderHook(() => usePriorityModal(), { wrapper });

    expect(() => result.current).toBeDefined();
  });

  // Add more tests to cover modal rendering, interaction, and context functionality
});
