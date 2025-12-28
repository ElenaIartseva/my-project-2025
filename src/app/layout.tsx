import type { Metadata } from 'next';
import '@/vendor/styles/variables.scss';
import '@/vendor/styles/reset.scss';
import '@/vendor/styles/global.scss';
import { onest } from './fonts';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Путешествие в Корею',
  description: '',
  keywords:
    'Республика Корея, Южная Корея, Корея, путешествие в Южную Корею, путешествие в Респубилку Корея, путешествие в Корею',
  openGraph: {
    title: 'Путешествие в Республику Корея',
    description: 'Сайт с краткой информацией о путешествии в Республику Корея',
    siteName: 'Путешествие в Корею',
    url: 'https://elenaustimenko.github.io/my-project-2025/',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru' className={onest.className}>
      <head>
        {/* Yandex.Metrika */}
        <Script id='yandex-metrika' strategy='afterInteractive'>
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
      </head>
      <body>
        {children}
        {/* Yandex.Metrika noscript */}
        <noscript>
          <div>
            <img
              src='https://mc.yandex.ru/watch/103541965'
              style={{ position: 'absolute', left: '-9999px' }}
              alt=''
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
