'use client';
import Image from 'next/image';
import { useState } from 'react';
import { placesList } from '@/utils/constants';
import classes from './Places.module.scss';

export const Places = () => {
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const handleShowMore = () => {
    const step = 3;
    const newCount = Math.min(visibleCount + step, placesList.length);
    setVisibleCount(newCount);
  };

  const handleShowLess = () => {
    const step = 3;
    const minCount = 3;
    const newCount = Math.max(minCount, visibleCount - step);
    setVisibleCount(newCount);
  };

  const canShowMore = visibleCount < placesList.length;
  const canShowLess = visibleCount > 3;

  const visiblePlaces = placesList.slice(0, visibleCount);

  return (
    <section className={classes.places}>
      <h2 className={`${classes.places_title} ${classes.text_shine}`}>
        Интересные места, которые стоит посетить во время своего путешествия
      </h2>

      <div className={classes.cards_container}>
        {visiblePlaces.map((item) => (
          <div key={item.id} className={classes.card}>
            <div className={classes.card_imgBGWrapper}>
              <Image
                className={classes.card_imgBG}
                src={item.img}
                alt={item.alt}
                placeholder='blur'
                fill
                sizes='(max-width: 768px) 100vw, 440px'
              />
            </div>
            <div className={classes.card_infoContainer}>
              <p className={classes.card_text}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.controls}>
        {canShowLess && (
          <button
            className={`${classes.control_btn} ${classes.less_btn}`}
            onClick={handleShowLess}
            aria-label='Скрыть карточки'
          >
            <span className={classes.btn_arrow_up}></span>
          </button>
        )}

        {canShowMore && (
          <button
            className={`${classes.control_btn} ${classes.more_btn}`}
            onClick={handleShowMore}
            aria-label='Показать больше карточек'
          >
            <span className={classes.btn_arrow_down}></span>
          </button>
        )}
      </div>
    </section>
  );
};
