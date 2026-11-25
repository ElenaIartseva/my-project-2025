'use client';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, type CSSProperties } from 'react';
import type { CityImage, PhotoListProps } from '../CityPage.props';
import { ImageModal } from '../../Modal/ImageModal/ImageModal';
import { mediaGalleryVariants } from '@utils/motionVariants';
import classes from './PhotoList.module.scss';

export const PhotoList: React.FC<PhotoListProps> = ({ city }) => {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<CityImage | null>(null);
  const reduceMotion = useReducedMotion();
  const images = city.images;

  if (!images?.length) {
    return null;
  }

  const count = images.length;
  const activeIndex = index % count;
  const half = Math.floor(count / 2);
  const cards = images
    .map((image, photoIndex) => ({
      image,
      photoIndex,
      offset: ((photoIndex - activeIndex + count + half) % count) - half,
    }))
    .filter(({ offset }) => Math.abs(offset) <= 3);

  const move = (step: number) => {
    setIndex((current) => ((current % count) + step + count) % count);
  };

  return (
    <>
      <motion.section
        className={classes.photoList}
        aria-label="Фотогалерея города"
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={mediaGalleryVariants}
        onKeyDown={(event) => {
          if (count < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            return;
          }
          event.preventDefault();
          const step = event.key === 'ArrowLeft' ? -1 : 1;
          if (
            event.target instanceof HTMLElement &&
            event.target.dataset.offset
          ) {
            event.currentTarget
              .querySelector<HTMLButtonElement>(
                `[data-offset="${count === 2 ? -1 : step}"]`,
              )
              ?.focus({ preventScroll: true });
          }
          move(step);
        }}
      >
        <div className={classes.stage}>
          {cards.map(({ image, photoIndex, offset }) => {
            const isActive = offset === 0;
            const isHidden = Math.abs(offset) > 2;

            return (
              <button
                key={image.id}
                type="button"
                className={classes.card}
                data-offset={offset}
                style={{ '--photo-offset': offset } as CSSProperties}
                tabIndex={isHidden ? -1 : undefined}
                aria-hidden={isHidden || undefined}
                aria-label={`${isActive ? 'Открыть' : 'Выбрать'} фото: ${image.alt}`}
                onClick={() =>
                  isActive ? setSelectedImage(image) : setIndex(photoIndex)
                }
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  loading={isActive ? 'eager' : 'lazy'}
                  placeholder={image.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={image.blurDataURL}
                  sizes="(max-width: 350px) 112px, (max-width: 850px) 32vw, 272px"
                  className={classes.photo}
                />
              </button>
            );
          })}

          {count > 1 && (
            <>
              <button
                type="button"
                className={`${classes.arrow} ${classes.previous}`}
                onClick={() => move(-1)}
                aria-label="Предыдущая фотография"
              />
              <button
                type="button"
                className={`${classes.arrow} ${classes.next}`}
                onClick={() => move(1)}
                aria-label="Следующая фотография"
              />
            </>
          )}
        </div>

        <p className={classes.caption} aria-live="polite">
          {images[activeIndex].alt}
        </p>

        {count > 1 && (
          <div className={classes.dots} role="group" aria-label="Выбор фото">
            {images.map((image, photoIndex) => (
              <button
                key={image.id}
                type="button"
                className={classes.dot}
                aria-label={`Фотография ${photoIndex + 1} из ${count}`}
                aria-current={photoIndex === activeIndex ? 'true' : undefined}
                onClick={() => setIndex(photoIndex)}
              />
            ))}
          </div>
        )}
      </motion.section>

      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </>
  );
};
