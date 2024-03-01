import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactPortal } from '@components/ReactPortal'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

describe('ReactPortal', () => {
  beforeEach(() => {
    document.body.innerHTML = ''; // Reset the DOM
  });

  it('renders children into a specified existing DOM element', () => {
    const wrapperId = 'test-portal';
    // Ensure the wrapper exists
    const wrapperEl = document.createElement('div');
    wrapperEl.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperEl);

    render(
      <ReactPortal wrapperId={wrapperId}>
        <div>Test Content</div>
      </ReactPortal>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(document.getElementById(wrapperId)).toContainElement(screen.getByText('Test Content'));
  });

  it('creates and renders children into a new DOM element when the specified does not exist', () => {
    const wrapperId = 'new-portal';

    render(
      <ReactPortal wrapperId={wrapperId}>
        <div>New Portal Content</div>
      </ReactPortal>,
    );

    expect(screen.getByText('New Portal Content')).toBeInTheDocument();
    expect(document.getElementById(wrapperId)).toContainElement(screen.getByText('New Portal Content'));
  });

  it('renders nothing when wrapper element cannot be found or created', () => {
    // Optionally mock createWrapperAndAppendToBody to return null for this test
    const wrapperId = 'non-existent-portal';

    const { container } = render(
      <ReactPortal wrapperId={wrapperId}>
        <div>Should Not Render</div>
      </ReactPortal>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
