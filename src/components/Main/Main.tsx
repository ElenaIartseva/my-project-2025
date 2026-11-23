import classes from './Main.module.scss';
import { Header } from '@components/Header';
import { Hero } from './Hero';
import { About } from './About';
import { Places } from './Places';
import { Footer } from '@components/Footer';
import { Cookie } from '@components/Cookie';

export const Main = () => {
  return (
    <main className={classes.main}>
      <Header />
      <Hero />
      <About />
      <Places />
      <Footer />
      <Cookie />
    </main>
  );
};
