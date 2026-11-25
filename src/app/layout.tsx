import type { Metadata } from 'next';
import '@vendor/styles/variables.scss';
import '@vendor/styles/reset.scss';
import '@vendor/styles/global.scss';
import { onest } from './fonts';
import { SiteMotion } from './SiteMotion';
import { Cookie } from '@components/Cookie';

export const metadata: Metadata = {
  title: 'Путешествие в Корею',
  description: 'Сайт с краткой информацией о путешествии в Республику Корея',
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
    <html lang="ru" className={onest.className}>
      <body>
        <Cookie>
          <SiteMotion>{children}</SiteMotion>
        </Cookie>
      </body>
    </html>
  );
}
