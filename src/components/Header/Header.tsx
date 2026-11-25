'use client';

import Link from 'next/link';
import Image from 'next/image';
import classes from './Header.module.scss';
import Menu from '@images/btn/burger_menu_white.svg';
import logo from '@images/logo/logo_blue.webp';
import { useHeaderState } from '@hooks/useHeaderState';
import { ContactLinks } from './ContactLinks/ContactLinks';
import { DesktopNav } from './DesktopNav/DesktopNav';
import { MobileNav } from './MobileNav/MobileNav';

export const Header = () => {
  const {
    closeMenu,
    closeButtonRef,
    isFixed,
    isMenuOpen,
    menuButtonRef,
    openMenu,
  } = useHeaderState({ firstSectionClassName: classes.header_sectionFirst });

  return (
    <header className={classes.header} id="top">
      <div className={classes.header_sectionFirst}>
        <div className={classes.header_containerForLogo}>
          <Link href="/">
            <Image
              src={logo}
              className={classes.header_logo}
              alt="логотип компании с самолётом облетающим земной шар"
            />
          </Link>
          <p className={classes.header_titleText}>
            Путешествие в Республику Корея
          </p>
        </div>
        <ContactLinks />
      </div>
      <div className={classes.navigationSlot}>
        <div
          className={`${classes.header_sectionSecond} ${
            isFixed ? classes.header_sectionSecondFixed : ''
          }`}
        >
          {isMenuOpen ? (
            <MobileNav closeButtonRef={closeButtonRef} onClose={closeMenu} />
          ) : (
            <DesktopNav
              isFixed={isFixed}
              menuButtonRef={menuButtonRef}
              onMenuOpen={openMenu}
            />
          )}
        </div>
      </div>
      {!isFixed && !isMenuOpen && (
        <button
          ref={menuButtonRef}
          type="button"
          className={classes.burger}
          onClick={openMenu}
          aria-label="Открыть меню"
          aria-expanded={false}
        >
          <Menu className={classes.header_menu} />
        </button>
      )}
      {isMenuOpen && <div className={classes.overlay} onClick={closeMenu} />}
    </header>
  );
};
