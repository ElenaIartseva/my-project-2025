import { CookieSettingsButton } from '@components/Cookie';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { contactLinks } from '@utils/contactLinks';
import classes from '@components/LegalDocuments/Legal.module.scss';

export const PolicyPage = () => (
  <div className={classes.page}>
    <Header />
    <main className={classes.legalAbout}>
      <h1 className={classes.title}>Политика конфиденциальности</h1>

      <section>
        <h2 className={classes.subtitle}>Как сохраняется ваш выбор</h2>
        <p>
          Сайт сохраняет ваше решение об аналитике в файле cookie на срок до 365
          дней. Вы можете пользоваться сайтом при любом выборе.
        </p>
      </section>

      <section>
        <h2 className={classes.subtitle}>Аналитика сайта</h2>
        <p>
          После согласия подключается Яндекс Метрика. Она помогает узнать, какие
          страницы посещают и как ими пользуются. Счётчик может получать
          сведения о просмотрах, браузере и устройстве. Включённый Вебвизор
          может записывать взаимодействия со страницей. Для учёта посещений
          Метрика может использовать cookie и данные в локальном хранилище
          браузера.
        </p>
        <p>
          Подробнее о работе сервиса можно прочитать в{' '}
          <a href="https://yandex.ru/support/metrica/ru/code/data-collected">
            документации Яндекс Метрики
          </a>{' '}
          и в{' '}
          <a href="https://yandex.ru/legal/confidential/ru/">
            политике конфиденциальности Яндекса
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={classes.subtitle}>Как изменить настройки</h2>
        <p>
          Вы можете изменить решение в любое время. При отмене согласия страница
          обновится и счётчик больше не будет загружаться. Чтобы удалить ранее
          сохранённые данные сайта, воспользуйтесь настройками браузера.
        </p>
        <CookieSettingsButton />
      </section>

      <section>
        <h2 className={classes.subtitle}>Контакты</h2>
        <p>
          По вопросам конфиденциальности напишите на{' '}
          <a href={contactLinks[0].href}>{contactLinks[0].label}</a>.
        </p>
      </section>
    </main>
    <Footer />
  </div>
);
