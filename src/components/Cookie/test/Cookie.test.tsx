import { fireEvent, render, screen } from '@testing-library/react';
import Cookies from 'js-cookie';
import { Cookie, CookieSettingsButton } from '../Cookie';

jest.mock('next/script', () => ({
  __esModule: true,
  default: function ScriptMarker({ id }: { id: string }) {
    return <span data-testid={id} />;
  },
}));

describe('Cookie', () => {
  beforeEach(() => {
    Cookies.remove('localConsent');
  });

  afterEach(() => {
    Cookies.remove('localConsent');
  });

  it('renders privacy policy link with safe blank-target attributes', () => {
    render(<Cookie />);

    const privacyPolicyLink = screen.getByRole('link', {
      name: /Узнать больше/i,
    });

    expect(privacyPolicyLink).toHaveAttribute('href', '/legal/privacy-policy');
    expect(privacyPolicyLink).toHaveAttribute('target', '_blank');
    expect(privacyPolicyLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('loads analytics only after explicit acceptance', () => {
    Cookies.set('localConsent', 'true');
    render(<Cookie />);

    expect(screen.queryByTestId('yandex-metrika')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Принять' }));
    expect(screen.getByTestId('yandex-metrika')).toBeInTheDocument();
    expect(Cookies.get('localConsent')).toBe('accepted');
  });

  it('remembers rejection and lets visitors reopen settings', () => {
    const view = (
      <Cookie>
        <CookieSettingsButton />
      </Cookie>
    );
    const { unmount } = render(view);
    fireEvent.click(screen.getByRole('button', { name: 'Отклонить' }));
    expect(Cookies.get('localConsent')).toBe('rejected');
    expect(screen.queryByTestId('yandex-metrika')).not.toBeInTheDocument();
    unmount();

    render(view);
    const settings = screen.getByRole('button', { name: 'Настроить Cookie' });
    expect(
      screen.queryByRole('heading', { name: 'Cookie' }),
    ).not.toBeInTheDocument();
    fireEvent.click(settings);
    expect(screen.getByRole('heading', { name: 'Cookie' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Принять' }));
    expect(settings).toHaveFocus();
    expect(screen.getByTestId('yandex-metrika')).toBeInTheDocument();
  });
});
