import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '../../dashboard/StatCard';

describe('StatCard', () => {
  const mockIcon = <svg data-testid="mock-icon" />;

  it('should render value and label', () => {
    render(<StatCard icon={mockIcon} value="42" label="Lessons Completed" />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Lessons Completed')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<StatCard icon={mockIcon} value="100" label="Score" />);

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should accept numeric value', () => {
    render(<StatCard icon={mockIcon} value={75} label="Progress" />);

    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('should apply custom icon background color', () => {
    render(
      <StatCard
        icon={mockIcon}
        value="50"
        label="Test"
        iconBgColor="#FF0000"
      />
    );

    const iconContainer = screen.getByTestId('mock-icon').parentElement;
    expect(iconContainer).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  it('should apply custom icon color', () => {
    render(
      <StatCard
        icon={mockIcon}
        value="50"
        label="Test"
        iconColor="#00FF00"
      />
    );

    const iconContainer = screen.getByTestId('mock-icon').parentElement;
    expect(iconContainer).toHaveStyle({ color: '#00FF00' });
  });

  it('should use default colors when not provided', () => {
    render(<StatCard icon={mockIcon} value="50" label="Test" />);

    const iconContainer = screen.getByTestId('mock-icon').parentElement;
    expect(iconContainer).toHaveStyle({
      backgroundColor: 'var(--accent-subtle)',
      color: 'var(--accent-primary)',
    });
  });

  it('should render label in uppercase', () => {
    render(<StatCard icon={mockIcon} value="50" label="test label" />);

    const label = screen.getByText('test label');
    expect(label).toHaveClass('uppercase');
  });
});
