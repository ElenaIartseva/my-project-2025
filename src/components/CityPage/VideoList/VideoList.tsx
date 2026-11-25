'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Modal } from '@components/Modal/Modal';
import { VideoPlayer } from '@components/VideoPlayer/VideoPlayer';
import { mediaGalleryVariants } from '@utils/motionVariants';
import type { VideoListProps } from '../CityPage.props';
import classes from './VideoList.module.scss';

export const VideoList: React.FC<VideoListProps> = ({ city }) => {
  const carouselRef = useRef<HTMLElement>(null);
  const isInView = useInView(carouselRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const videos = city.video;
  const count = videos?.length ?? 0;
  const isAutoPlaying =
    count > 1 &&
    isInView &&
    !reduceMotion &&
    !isPaused &&
    !isHovered &&
    !hasFocus &&
    !selectedVideo;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [count, isAutoPlaying]);

  if (!videos?.length) return null;

  const activeIndex = index % count;
  const cards = videos
    .map((video, videoIndex) => {
      const offset = (videoIndex - activeIndex + count) % count;
      return { video, depth: count > 4 && offset === count - 1 ? -1 : offset };
    })
    .filter(({ depth }) => depth <= 3);

  const move = (step: number) => {
    setIndex((current) => ((current % count) + step + count) % count);
  };

  return (
    <>
      <motion.section
        ref={carouselRef}
        className={classes.videoList}
        aria-label="Видеогалерея города"
        initial={reduceMotion ? false : 'hidden'}
        animate={isInView || reduceMotion ? 'visible' : 'hidden'}
        variants={mediaGalleryVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setHasFocus(false);
          }
        }}
      >
        <div className={classes.stage}>
          <div className={classes.deck}>
            {cards.map(({ video, depth }) => (
              <button
                key={video.id}
                type="button"
                className={classes.card}
                style={{ '--video-depth': depth } as CSSProperties}
                data-depth={depth}
                disabled={depth !== 0}
                aria-hidden={depth !== 0 || undefined}
                aria-label={`Открыть видео ${video.id}`}
                onClick={() => setSelectedVideo(video.src)}
              >
                <Image
                  src={video.img}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 75vw, 560px"
                  className={classes.posterImage}
                />
                {depth === 0 && <span className={classes.play} />}
              </button>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className={classes.controls}>
            <button
              type="button"
              className={`${classes.arrow} ${classes.previous}`}
              aria-label="Предыдущее видео"
              onClick={() => move(-1)}
            />
            <span
              className={classes.counter}
              aria-live={isAutoPlaying ? 'off' : 'polite'}
            >
              {activeIndex + 1} / {count}
            </span>
            <button
              type="button"
              className={classes.arrow}
              aria-label="Следующее видео"
              onClick={() => move(1)}
            />
            {!reduceMotion && (
              <button
                type="button"
                className={classes.autoplay}
                aria-label={
                  isPaused
                    ? 'Запустить автопоказ видео'
                    : 'Пауза автопоказа видео'
                }
                onClick={() => setIsPaused((paused) => !paused)}
              >
                {isPaused ? 'Автопоказ' : 'Пауза'}
              </button>
            )}
          </div>
        )}
      </motion.section>

      <Modal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
      >
        {selectedVideo && <VideoPlayer url={selectedVideo} />}
      </Modal>
    </>
  );
};
