import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../common/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-surface');
  });

  it('applies danger variant styles', () => {
    render(<Button variant="danger">Delete</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-danger');
  });

  it('applies success variant styles', () => {
    render(<Button variant="success">Success</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#6B8C6E]');
  });

  it('applies ghost variant styles', () => {
    render(<Button variant="ghost">Ghost</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
  });

  it('applies small size styles', () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-4', 'py-2', 'text-sm');
  });

  it('applies medium size styles by default', () => {
    render(<Button>Medium</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'text-base');
  });

  it('applies large size styles', () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-8', 'py-3', 'text-lg');
  });

  it('applies full width when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not trigger click when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('accepts additional className prop', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has minimum touch target size for WCAG compliance', () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button');
    // All sizes should have min-h-[44px] for WCAG 2.2 AA compliance
    expect(button).toHaveClass('min-h-[44px]');
  });
});
