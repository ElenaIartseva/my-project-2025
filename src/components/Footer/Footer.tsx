import Link from 'next/link';
import Image from 'next/image';
import classes from './Footer.module.scss';
import logo from '@images/logo/logo_blue.webp';
import { FooterContactLinks } from './FooterContactLinks/FooterContactLinks';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer} id="contacts">
      <div className={classes.footer_wrapper}>
        <div className={classes.footer_firstContainer}>
          <div className={classes.footer_firstContainerWrapper}>
            <div className={classes.footer_firstContainerLeft}>
              <div className={classes.footer_logoWrapper}>
                <Link href="/">
                  <Image
                    src={logo}
                    className={classes.footer_logo}
                    alt="логотип компании с самолётом облетающим земной шар"
                  />
                </Link>
                <p className={classes.footer_titleText}>
                  Путешествие в Республику Корея
                </p>
              </div>
            </div>
            <div className={classes.footer_linkUpWrapper}>
              <Link className={classes.footer_linkUp} href="#top">
                Наверх
              </Link>
            </div>
            <div className={classes.footer_firstContainerRight}>
              <FooterContactLinks />
            </div>
          </div>
        </div>
        <div className={classes.footer_lastContainer}>
          <p className={classes.footer_text}>
            © {currentYear}. Design & Develop by Elena Iartseva
          </p>
        </div>
      </div>
    </footer>
  );
};
