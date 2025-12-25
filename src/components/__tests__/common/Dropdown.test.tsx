import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown, type DropdownItem } from '../../common/Dropdown';

const mockItems: DropdownItem[] = [
  { label: 'Profile', onClick: vi.fn() },
  { label: 'Settings', to: '/settings' },
  { label: 'Logout', onClick: vi.fn() },
];

describe('Dropdown', () => {
  it('should render the trigger button', () => {
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('should not show menu items initially', () => {
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('should open menu when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    await user.click(screen.getByText('Menu'));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should close menu when trigger is clicked again', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    const trigger = screen.getByText('Menu');
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should close menu when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    await user.click(screen.getByText('Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should call onClick handler when button item is clicked', async () => {
    const onClick = vi.fn();
    const items: DropdownItem[] = [{ label: 'Click Me', onClick }];
    const user = userEvent.setup();

    render(<Dropdown trigger={<span>Menu</span>} items={items} />);

    await user.click(screen.getByText('Menu'));
    await user.click(screen.getByText('Click Me'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should close menu after item click', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    await user.click(screen.getByText('Menu'));
    await user.click(screen.getByText('Profile'));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should render link items with href', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    await user.click(screen.getByText('Menu'));

    const settingsLink = screen.getByText('Settings').closest('a');
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });

  it('should have aria-expanded attribute on trigger', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have aria-haspopup attribute on trigger', () => {
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'true');
  });

  it('should render items with role menuitem', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    await user.click(screen.getByText('Menu'));

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
  });

  it('should render item icons when provided', async () => {
    const user = userEvent.setup();
    const itemsWithIcon: DropdownItem[] = [
      { label: 'With Icon', icon: <span data-testid="test-icon">🔧</span>, onClick: vi.fn() },
    ];

    render(<Dropdown trigger={<span>Menu</span>} items={itemsWithIcon} />);

    await user.click(screen.getByText('Menu'));
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should apply custom className to dropdown container', () => {
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={mockItems} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should align menu to the right by default', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} />);

    await user.click(screen.getByText('Menu'));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('right-0');
  });

  it('should align menu to the left when specified', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<span>Menu</span>} items={mockItems} align="left" />);

    await user.click(screen.getByText('Menu'));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('left-0');
  });

  it('should close menu when clicking outside', async () => {
    render(
      <div>
        <Dropdown trigger={<span>Menu</span>} items={mockItems} />
        <button>Outside</button>
      </div>
    );

    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
