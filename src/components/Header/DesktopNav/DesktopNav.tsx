import Image from 'next/image';
import type { Ref } from 'react';
import classes from '../Header.module.scss';
import Menu from '@images/btn/burger_menu_white.svg';
import logo from '@images/logo/logo_blue.webp';
import { cityLinks, externalLinks } from '../Header.data';
import { HeaderLink } from '../HeaderLink/HeaderLink';

interface DesktopNavProps {
  isFixed: boolean;
  menuButtonRef: Ref<HTMLButtonElement>;
  onMenuOpen: () => void;
}

export const DesktopNav = ({
  isFixed,
  menuButtonRef,
  onMenuOpen,
}: DesktopNavProps) => (
  <nav className={classes.header_list}>
    <div className={classes.header_linkOpenMenuWrapper}>
      {cityLinks.map((link) => (
        <HeaderLink
          key={link.href}
          {...link}
          className={`${classes.header_link} ${classes.btn_animationLine}`}
        />
      ))}
    </div>
    {isFixed ? (
      <div className={classes.header_linklWrapperFixed}>
        <div className={classes.header_linkContainerFixed}>
          <Image src={logo} className={classes.header_logo} alt="лого" />
        </div>
        {externalLinks.map((link) => (
          <HeaderLink
            key={link.href}
            {...link}
            className={`${classes.header_link} ${classes.btn_animationLine}`}
          />
        ))}
        <button
          ref={menuButtonRef}
          type="button"
          className={`${classes.burger} ${classes.burgerFixed}`}
          onClick={onMenuOpen}
          aria-label="Открыть меню"
          aria-expanded={false}
        >
          <Menu
            className={`${classes.header_menu} ${classes.header_menuFixed}`}
          />
        </button>
      </div>
    ) : (
      <div className={classes.header_containerForlinkFixed}>
        {externalLinks.map((link) => (
          <HeaderLink
            key={link.href}
            {...link}
            className={`${classes.header_link} ${classes.btn_animationLine}`}
          />
        ))}
      </div>
    )}
  </nav>
);
