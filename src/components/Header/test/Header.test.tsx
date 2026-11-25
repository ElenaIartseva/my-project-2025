import type { SVGProps } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { KETA_URL, WOWPASS_URL } from '@utils/constants';

jest.mock('@images/btn/burger_menu_white.svg', () => ({
  __esModule: true,
  default: function MenuIcon(props: SVGProps<SVGSVGElement>) {
    return <svg data-testid="menu-icon" {...props} />;
  },
}));

jest.mock('@images/btn/burger_close_white.svg', () => ({
  __esModule: true,
  default: function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return <svg data-testid="close-icon" {...props} />;
  },
}));

describe('Header', () => {
  it('renders city navigation links in the current tab', () => {
    render(<Header />);

    [
      { name: /Сеул/, href: '/cities/seoul' },
      { name: /Пусан/, href: '/cities/busan' },
      { name: /Чеджу/, href: '/cities/jeju' },
    ].forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });

      expect(link).toHaveAttribute('href', href);
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });
  });

  it('renders external links with safe blank-target attributes', () => {
    render(<Header />);

    [
      { name: /К-ЕТА/, href: KETA_URL },
      { name: /WOWPASS/, href: WOWPASS_URL },
    ].forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });

      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders email without a phone link or a new tab', () => {
    const { container } = render(<Header />);

    const emailLink = screen.getByRole('link', {
      name: /elena\.iartseva64@gmail\.com/,
    });

    expect(container.querySelector('a[href^="tel:"]')).not.toBeInTheDocument();

    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:elena.iartseva64@gmail.com',
    );
    expect(emailLink).not.toHaveAttribute('target');
    expect(emailLink).not.toHaveAttribute('rel');
  });

  it('opens and closes the mobile menu with menu buttons', () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: /Открыть меню/i }));

    expect(screen.getByRole('button', { name: /Закрыть меню/i })).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: /Закрыть меню/i }));

    expect(
      screen.queryByRole('button', { name: /Закрыть меню/i }),
    ).not.toBeInTheDocument();
  });

  it('closes the mobile menu with Escape', () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: /Открыть меню/i }));

    expect(screen.getByRole('button', { name: /Закрыть меню/i })).toBeVisible();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(
      screen.queryByRole('button', { name: /Закрыть меню/i }),
    ).not.toBeInTheDocument();
  });
});
