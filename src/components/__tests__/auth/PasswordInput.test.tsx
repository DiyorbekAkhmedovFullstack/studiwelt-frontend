import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from '../../auth/PasswordInput';

describe('PasswordInput', () => {
  it('renders label correctly', () => {
    render(<PasswordInput label="Password" />);

    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('renders password input with type password by default', () => {
    const { container } = render(<PasswordInput label="Password" />);

    // Password inputs don't have role="textbox", so use querySelector
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility when show button is clicked', async () => {
    const user = userEvent.setup();
    render(<PasswordInput label="Password" placeholder="Enter password" />);

    const input = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button', { name: 'Show password' });

    // Initially password is hidden
    expect(input).toHaveAttribute('type', 'password');

    // Click to show password
    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();

    // Click to hide password
    await user.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('displays error message when error prop is provided', () => {
    render(<PasswordInput label="Password" error="Password is too weak" />);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Password is too weak');
  });

  it('does not display error message when no error prop', () => {
    render(<PasswordInput label="Password" />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('passes through HTML input props', () => {
    render(
      <PasswordInput
        label="Password"
        placeholder="Enter password"
        required
        disabled
        minLength={8}
      />,
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('minLength', '8');
  });

  it('applies custom className', () => {
    render(<PasswordInput label="Password" className="custom-class" placeholder="test" />);

    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('custom-class');
  });

  it('handles user input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<PasswordInput label="Password" onChange={handleChange} placeholder="Enter password" />);

    const input = screen.getByPlaceholderText('Enter password');
    await user.type(input, 'mypassword123');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('mypassword123');
  });

  it('toggle button is type button to prevent form submission', () => {
    render(<PasswordInput label="Password" />);

    const toggleButton = screen.getByRole('button', { name: 'Show password' });
    expect(toggleButton).toHaveAttribute('type', 'button');
  });

  it('has accessible toggle button with proper aria-label', () => {
    render(<PasswordInput label="Password" />);

    const toggleButton = screen.getByRole('button', { name: 'Show password' });
    expect(toggleButton).toHaveAttribute('aria-label', 'Show password');
  });
});
