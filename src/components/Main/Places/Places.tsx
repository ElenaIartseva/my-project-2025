'use client';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { placesList } from '@/utils/constants';
import classes from './Places.module.scss';

export const Places = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(440);
  const [visibleCards, setVisibleCards] = useState<number>(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [fadeClass, setFadeClass] = useState('');
  const [visibleCardsState, setVisibleCardsState] = useState<
    Record<number, boolean>
  >({});
  const gap = 40;

  const addToRefs = useCallback((el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newCardWidth = window.innerWidth <= 768 ? 320 : 440;
      setCardWidth(newCardWidth);

      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.clientWidth;
        const cardsFit = Math.floor(wrapperWidth / (newCardWidth + gap));
        setVisibleCards(Math.max(1, cardsFit));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updates: Record<number, boolean> = {};

        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          updates[id] = entry.isIntersecting && entry.intersectionRatio >= 0.95;
        });

        setVisibleCardsState((prev) => ({ ...prev, ...updates }));
      },
      {
        root: wrapperRef.current,
        threshold: [0, 0.1, 0.5, 0.7, 1],
        rootMargin: '0px 10px',
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [currentIndex, visibleCards]);

  const updateFadeClasses = () => {
    if (!wrapperRef.current) return;

    const isBackDisabled = currentIndex === 0;
    const isForwardDisabled =
      currentIndex >= Math.max(0, placesList.length - visibleCards);

    let newClass = '';
    if (!isBackDisabled && !isForwardDisabled) {
      newClass = classes.fadeBoth;
    } else if (!isBackDisabled) {
      newClass = classes.fadeLeft;
    } else if (!isForwardDisabled) {
      newClass = classes.fadeRight;
    }

    setFadeClass(newClass);
  };

  useEffect(() => {
    updateFadeClasses();
  }, [currentIndex, visibleCards]);

  const maxIndex = Math.max(0, placesList.length - visibleCards);
  const isBackDisabled = currentIndex === 0;
  const isForwardDisabled = currentIndex >= maxIndex;

  const handleClickBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleClickForward = () => {
    if (!isForwardDisabled) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const cardOffset = -currentIndex * (cardWidth + gap);

  return (
    <section className={classes.places}>
      <h2 className={`${classes.places_title} ${classes.text_shine}`}>
        Интересные места, которые стоит посетить во время своего путешествия
      </h2>
      <div className={classes.carousel_container}>
        <button
          className={`${classes.btn_side} ${classes.btn_left} ${
            isBackDisabled ? classes.disabled : ''
          }`}
          onClick={handleClickBack}
          disabled={isBackDisabled}
          aria-label='Предыдущие карточки'
        >
          <span className={classes.btn_arrow_left}></span>
        </button>

        <div className={classes.carousel_content}>
          <div
            className={`${classes.cards_wrapper} ${fadeClass}`}
            ref={wrapperRef}
          >
            <div
              style={{
                transform: `translateX(${cardOffset}px)`,
                transition: 'transform 0.5s ease-in-out',
              }}
              className={classes.cards_container}
            >
              {placesList.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => addToRefs(el, index)}
                  data-id={item.id}
                  className={`${classes.card} ${
                    visibleCardsState[item.id] ? '' : classes.card_dimmed
                  }`}
                >
                  <div className={classes.card_imgBGWrapper}>
                    <Image
                      className={classes.card_imgBG}
                      src={item.img}
                      alt={item.alt}
                      placeholder='blur'
                    />
                  </div>
                  <div className={classes.card_infoContainer}>
                    <p className={classes.card_text}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className={`${classes.btn_side} ${classes.btn_right} ${
            isForwardDisabled ? classes.disabled : ''
          }`}
          onClick={handleClickForward}
          disabled={isForwardDisabled}
          aria-label='Следующие карточки'
        >
          <span className={classes.btn_arrow_right}></span>
        </button>
      </div>
    </section>
  );
};
