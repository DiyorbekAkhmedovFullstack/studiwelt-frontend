import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../../common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with correct accessibility attributes', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('has screen reader text', () => {
    render(<LoadingSpinner />);

    const srText = screen.getByText('Loading...');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });

  it('contains an animated spinner element', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status');
    const animatedDiv = spinner.querySelector('.animate-spin');
    expect(animatedDiv).toBeInTheDocument();
  });
});
