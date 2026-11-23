'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { placesList } from '@utils/constantsPlaces';
import { pageContainerVariants } from '@utils/motionVariants';
import classes from './Places.module.scss';

const totalPlaces = placesList.length;
const cardOffsets = [-2, -1, 0, 1, 2];

const titleVariants = {
  enter: (direction: number) => ({ y: `${direction * 100}%` }),
  center: { y: 0 },
  exit: (direction: number) => ({ y: `${direction * -100}%` }),
};

export const Places = () => {
  const [{ index, direction }, setSlide] = useState({ index: 0, direction: 1 });
  const reduceMotion = useReducedMotion();
  const activePlace = placesList[index];

  const move = (direction: -1 | 1) => {
    setSlide(({ index }) => ({
      index: (index + direction + totalPlaces) % totalPlaces,
      direction,
    }));
  };

  return (
    <section className={classes.places}>
      <motion.h2
        className={`${classes.sectionTitle} ${classes.text_shine}`}
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={pageContainerVariants}
      >
        Интересные места, которые стоит посетить во время своего путешествия
      </motion.h2>

      <div className={classes.slider} data-tone={index % 4}>
        <div className={classes.info}>
          <h3 className={classes.placeTitle} aria-live="polite">
            <span className={classes.visuallyHidden}>{activePlace.title}</span>
            <AnimatePresence initial={false} custom={direction}>
              <motion.span
                aria-hidden="true"
                className={classes.animatedTitle}
                key={activePlace.id}
                custom={direction}
                variants={titleVariants}
                initial={reduceMotion ? false : 'enter'}
                animate="center"
                exit={reduceMotion ? undefined : 'exit'}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {activePlace.title}
              </motion.span>
            </AnimatePresence>
          </h3>

          <div className={classes.controls}>
            <button
              type="button"
              className={`${classes.control} ${classes.previous}`}
              onClick={() => move(-1)}
              aria-label="Предыдущее место"
            />
            <button
              type="button"
              className={classes.control}
              onClick={() => move(1)}
              aria-label="Следующее место"
            />
            <span className={classes.counter}>
              {index + 1} / {totalPlaces}
            </span>
          </div>

          <p key={activePlace.id} className={classes.description}>
            {activePlace.text}
          </p>
        </div>

        <div className={classes.gallery}>
          {cardOffsets.map((offset) => {
            const place =
              placesList[(index + offset + totalPlaces) % totalPlaces];

            return (
              <div
                key={place.id}
                className={classes.card}
                data-offset={offset}
                aria-hidden={offset !== 0}
              >
                <Image
                  className={classes.photo}
                  src={place.img}
                  alt={offset === 0 ? place.alt : ''}
                  fill
                  sizes="(max-width: 768px) 70vw, (max-width: 1024px) 42vw, 40vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
