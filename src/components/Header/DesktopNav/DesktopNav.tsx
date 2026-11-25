import Image from 'next/image';
import classes from '../Header.module.scss';
import Menu from '@images/btn/burger_menu_white.svg';
import logo from '@images/logo/logo_blue.webp';
import { cityLinks, externalLinks } from '../Header.data';
import { HeaderLink } from '../HeaderLink/HeaderLink';

interface DesktopNavProps {
  isFixed: boolean;
  onMenuToggle: () => void;
  onLinkClick: () => void;
}

export const DesktopNav = ({
  isFixed,
  onMenuToggle,
  onLinkClick,
}: DesktopNavProps) => (
  <nav className={classes.header_list}>
    <div className={classes.header_linkOpenMenuWrapper}>
      {cityLinks.map((link) => (
        <HeaderLink
          key={link.href}
          {...link}
          className={`${classes.header_link} ${classes.btn_animationLine}`}
          onClick={onLinkClick}
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
            onClick={onLinkClick}
          />
        ))}
        <button
          type="button"
          className={`${classes.burger} ${classes.burgerFixed}`}
          onClick={onMenuToggle}
          aria-label="Открыть меню"
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
            onClick={onLinkClick}
          />
        ))}
      </div>
    )}
  </nav>
);
