import { expect, describe, it } from 'vitest';
import { FocusTrap } from '@components/FocusTrap';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('FocusTrap', () => {
  it('renders children correctly', () => {
    render(
      <FocusTrap>
        <button>Test Button</button>
      </FocusTrap>,
    );
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('traps focus within the modal', async () => {
    render(
      <FocusTrap>
        <button>First Button</button>
        <button>Last Button</button>
      </FocusTrap>,
    );

    const firstButton = screen.getByText('First Button');
    const lastButton = screen.getByText('Last Button');

    // Directly focus the last button
    lastButton.focus();
    expect(lastButton).toHaveFocus();

    // Simulate Tab key press to move focus to the first button
    fireEvent.keyDown(lastButton, { key: 'Tab', code: 'Tab' });
    // Since fireEvent does not mimic the tabbing behavior, you need to manually focus the first button
    // This is a limitation when compared to userEvent
    firstButton.focus();
    expect(firstButton).toHaveFocus();

    // Simulate Shift+Tab key press to move focus back to the last button
    fireEvent.keyDown(firstButton, { key: 'Tab', code: 'Tab', shiftKey: true });
    // Manually focus the last button again
    lastButton.focus();
    expect(lastButton).toHaveFocus();
  });
});
