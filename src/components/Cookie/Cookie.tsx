'use client';

import Cookies from 'js-cookie';
import Script from 'next/script';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import classes from './Cookie.module.scss';

type Consent = 'accepted' | 'rejected';

const consentCookie = 'localConsent';
const CookieSettingsContext = createContext<
  ((opener: HTMLButtonElement) => void) | null
>(null);

export const CookieSettingsButton = () => {
  const openSettings = useContext(CookieSettingsContext);

  return (
    <button
      type="button"
      className={classes.action}
      onClick={(event) => openSettings?.(event.currentTarget)}
    >
      Настроить Cookie
    </button>
  );
};

export const Cookie = ({ children }: PropsWithChildren) => {
  const [consent, setConsent] = useState<Consent | null>();
  const [settingsOpener, setSettingsOpener] =
    useState<HTMLButtonElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const saved = Cookies.get(consentCookie);
    setConsent(saved === 'accepted' || saved === 'rejected' ? saved : null);
  }, []);

  useEffect(() => {
    if (settingsOpener) titleRef.current?.focus({ preventScroll: true });
  }, [settingsOpener]);

  const saveConsent = (choice: Consent) => {
    Cookies.set(consentCookie, choice, {
      expires: 365,
      path: '/',
      sameSite: 'lax',
      secure: window.location.protocol === 'https:',
    });
    setConsent(choice);
    settingsOpener?.focus({ preventScroll: true });
    setSettingsOpener(null);

    if (consent === 'accepted' && choice === 'rejected') {
      window.location.reload();
    }
  };

  return (
    <CookieSettingsContext.Provider value={setSettingsOpener}>
      {children}

      {consent === 'accepted' && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103541965', 'ym');

            ym(103541965, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
      )}

      {(consent === null || settingsOpener !== null) && (
        <aside className={classes.modalWindow} aria-labelledby="cookie-title">
          <h2
            id="cookie-title"
            ref={titleRef}
            tabIndex={-1}
            className={classes.cookie_title}
          >
            Cookie
          </h2>
          <p className={classes.cookie_text}>
            Мы используем файлы cookies для улучшения пользовательского опыта и
            сбора статистики
          </p>
          <div className={classes.actions}>
            <a
              className={`${classes.action} ${classes.secondary}`}
              href="/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Узнать больше
            </a>
            <button
              type="button"
              className={`${classes.action} ${classes.secondary}`}
              onClick={() => saveConsent('rejected')}
            >
              Отклонить
            </button>
            <button
              type="button"
              className={classes.action}
              onClick={() => saveConsent('accepted')}
            >
              Принять
            </button>
          </div>
        </aside>
      )}
    </CookieSettingsContext.Provider>
  );
};
