import { useCallback, useEffect, useRef, useState } from 'react';

interface UseHeaderStateParams {
  firstSectionClassName: string;
}

export const useHeaderState = ({
  firstSectionClassName,
}: UseHeaderStateParams) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreMenuFocus = useRef(false);

  const openMenu = () => {
    restoreMenuFocus.current = true;
    setIsMenuOpen(true);
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      closeButtonRef.current?.focus({ preventScroll: true });
    } else if (restoreMenuFocus.current) {
      menuButtonRef.current?.focus({ preventScroll: true });
      restoreMenuFocus.current = false;
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [closeMenu, isMenuOpen]);

  useEffect(() => {
    const header = document.getElementById('top');
    const firstSection = header?.querySelector(
      `.${firstSectionClassName}`,
    ) as HTMLElement | null;

    if (!firstSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${firstSection.offsetHeight}px 0px 0px 0px`,
      },
    );

    observer.observe(firstSection);

    return () => {
      observer.disconnect();
    };
  }, [firstSectionClassName]);

  return {
    closeMenu,
    closeButtonRef,
    isFixed,
    isMenuOpen,
    menuButtonRef,
    openMenu,
  };
};
