import type { SVGProps } from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

jest.mock('@images/icons/telegram.svg', () => ({
  __esModule: true,
  default: function TelegramIcon(props: SVGProps<SVGSVGElement>) {
    return <svg data-testid="telegram-icon" {...props} />;
  },
}));

describe('Footer', () => {
  it('renders internal links with expected href values', () => {
    render(<Footer />);

    const homeLink = screen.getByRole('link', {
      name: /логотип компании с самолётом/i,
    });
    const topLink = screen.getByRole('link', { name: /Наверх/ });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(topLink).toHaveAttribute('href', '#top');
  });

  it('renders external Telegram link with safe blank-target attributes', () => {
    const { container } = render(<Footer />);

    const telegramLink = container.querySelector(
      'a[href="https://t.me/elena_6464"]',
    );

    expect(telegramLink).toHaveAttribute('target', '_blank');
    expect(telegramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders email without a phone link or a new tab', () => {
    const { container } = render(<Footer />);

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
});
