import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormInput } from '../../auth/FormInput';

describe('FormInput', () => {
  it('renders label correctly', () => {
    render(<FormInput label="Email" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(<FormInput label="Email" type="email" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates label with input', () => {
    render(<FormInput label="Email" id="email-input" />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Email');

    // Label should be in the same container
    expect(label.parentElement).toContainElement(input);
  });

  it('passes through HTML input props', () => {
    render(
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        disabled
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it('displays error message when error prop is provided', () => {
    render(<FormInput label="Email" error="Invalid email address" />);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Invalid email address');
  });

  it('does not display error message when no error prop', () => {
    render(<FormInput label="Email" />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FormInput label="Email" className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('handles user input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<FormInput label="Email" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test@example.com');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test@example.com');
  });

  it('has proper focus styles class', () => {
    render(<FormInput label="Email" />);

    const input = screen.getByRole('textbox');
    // Check that focus styles are present in the className
    expect(input.className).toContain('focus:outline-none');
    expect(input.className).toContain('focus:border-primary');
  });

  it('error message has correct styling', () => {
    render(<FormInput label="Email" error="Error message" />);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveClass('text-danger');
    expect(errorMessage).toHaveClass('text-sm');
  });
});
