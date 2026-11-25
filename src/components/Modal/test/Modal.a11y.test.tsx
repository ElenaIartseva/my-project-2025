import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Modal } from '../Modal';

describe('Modal accessibility', () => {
  beforeAll(() => {
    Object.assign(HTMLDialogElement.prototype, {
      showModal(this: HTMLDialogElement) {
        this.open = true;
        this.querySelector('button')?.focus();
      },
      close(this: HTMLDialogElement) {
        this.open = false;
      },
    });
  });

  it('renders an accessible dialog without axe violations', async () => {
    const { container } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Контент модального окна</p>
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('button', { name: /Закрыть/i })).toBeVisible();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = jest.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Контент модального окна</p>
      </Modal>,
    );

    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { cancelable: true }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Контент модального окна</p>
      </Modal>,
    );

    const overlay = container.firstElementChild;

    expect(overlay).toBeInstanceOf(HTMLElement);

    fireEvent.click(overlay as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('focuses the close button and restores focus and overflow when closed', () => {
    const onClose = jest.fn();
    const view = (isOpen: boolean) => (
      <>
        <button type="button">Открыть</button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <p>Контент модального окна</p>
        </Modal>
      </>
    );
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'clip';
    const { rerender } = render(view(false));
    const opener = screen.getByRole('button', { name: 'Открыть' });
    opener.focus();
    rerender(view(true));

    expect(screen.getByRole('button', { name: 'Закрыть' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');

    rerender(view(false));
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe('clip');
    document.body.style.overflow = previousOverflow;
  });
});
