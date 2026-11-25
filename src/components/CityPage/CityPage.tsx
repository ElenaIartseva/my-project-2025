'use client';
import { motion } from 'framer-motion';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { PhotoList } from '@components/CityPage/PhotoList';
import { VideoList } from '@components/CityPage/VideoList';
import type { City } from './CityPage.props';
import {
  pageContainerVariants,
  slideUpItemVariants,
} from '@utils/motionVariants';
import classes from '@components/CityPage/CityPage.module.scss';

interface CityPageProps {
  city: City;
}

export const CityPage = ({ city }: CityPageProps) => {
  const hasImages = city.images.length > 0;
  const hasVideos = city.video.length > 0;

  return (
    <section className={classes.cityPage}>
      <Header />
      <motion.div
        className={classes.cityAbout}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={pageContainerVariants}
      >
        <motion.h2
          className={classes.cityAbout_title}
          variants={slideUpItemVariants}
          whileHover={{ x: -6 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          {city.name}
        </motion.h2>
        <motion.p
          className={classes.cityAbout_text}
          variants={slideUpItemVariants}
          whileHover={{ x: -6 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          {city.text0}
        </motion.p>
        <motion.p
          className={classes.cityAbout_text}
          variants={slideUpItemVariants}
          whileHover={{ x: -6 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          {city.text1}
        </motion.p>
        <motion.p
          className={classes.cityAbout_text}
          variants={slideUpItemVariants}
          whileHover={{ x: -6 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          {city.text2}
        </motion.p>
      </motion.div>
      {hasImages && (
        <div className={classes.mediaSection}>
          <p className={`${classes.mediaCaption} ${classes.text_shine}`}>
            кликни по фото, чтобы посмотреть подробнее
          </p>
          <PhotoList city={city} />
        </div>
      )}
      {hasVideos && (
        <div className={classes.mediaSection}>
          <p className={`${classes.mediaCaption} ${classes.text_shine}`}>
            кликни по видео, чтобы начать просмотр
          </p>
          <VideoList city={city} />
        </div>
      )}
      <Footer />
    </section>
  );
};
