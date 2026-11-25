import classes from '../Header.module.scss';
import Close from '@images/btn/burger_close_white.svg';
import { cityLinks, externalLinks } from '../Header.data';
import { HeaderLink } from '../HeaderLink/HeaderLink';

interface MobileNavProps {
  onClose: () => void;
  onLinkClick: () => void;
}

export const MobileNav = ({ onClose, onLinkClick }: MobileNavProps) => (
  <nav className={`${classes.header_list} ${classes.open}`}>
    <button
      type="button"
      className={`${classes.burger} ${classes.burgerFixed}`}
      onClick={onClose}
      aria-label="Закрыть меню"
    >
      <Close className={classes.header_menuOpen} />
    </button>
    {[...cityLinks, ...externalLinks].map((link) => (
      <HeaderLink
        key={link.href}
        {...link}
        className={classes.btn_animationLine}
        onClick={onLinkClick}
      />
    ))}
  </nav>
);
