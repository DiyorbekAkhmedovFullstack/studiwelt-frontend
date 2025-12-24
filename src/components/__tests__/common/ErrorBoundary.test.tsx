import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../../common/ErrorBoundary';

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
}

describe('ErrorBoundary', () => {
  // Suppress console.error for expected errors
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders default fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're sorry, but something unexpected happened. Please try again.",
      ),
    ).toBeInTheDocument();
  });

  it('displays error message in technical details', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    // Open the details
    const detailsSummary = screen.getByText('Technical details');
    expect(detailsSummary).toBeInTheDocument();

    // Error message should be visible
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('calls onError callback when an error occurs', () => {
    const handleError = vi.fn();

    render(
      <ErrorBoundary onError={handleError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) }),
    );
  });

  it('resets error state when Try Again button is clicked', async () => {
    const user = userEvent.setup();

    // Use a component that we can control
    let shouldThrow = true;
    function ControlledThrow() {
      if (shouldThrow) {
        throw new Error('Test error');
      }
      return <div>Recovered content</div>;
    }

    const { rerender } = render(
      <ErrorBoundary>
        <ControlledThrow />
      </ErrorBoundary>,
    );

    // Should show error UI
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Fix the error
    shouldThrow = false;

    // Click Try Again
    await user.click(screen.getByRole('button', { name: 'Try Again' }));

    // Rerender to apply the fix
    rerender(
      <ErrorBoundary>
        <ControlledThrow />
      </ErrorBoundary>,
    );

    // Should show recovered content
    expect(screen.getByText('Recovered content')).toBeInTheDocument();
  });

  it('has Go Home button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('button', { name: 'Go Home' })).toBeInTheDocument();
  });
});
