'use client';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  compactContainerVariants,
  slideUpItemVariants,
} from '@utils/motionVariants';
import classes from './Hero.module.scss';

interface MatrixColumn {
  id: number;
  animationDelay: string;
  animationDuration: string;
}

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([]);

  const createMatrix = useCallback(() => {
    const colCount = Math.floor(window.innerWidth / 20);

    setMatrixColumns(
      Array.from({ length: colCount }, (_, index) => ({
        id: index,
        animationDelay: `-${(Math.random() * 5).toFixed(1)}s`,
        animationDuration: `${10 + Math.random() * 10}s`,
      })),
    );
  }, []);

  useEffect(() => {
    createMatrix();
    window.addEventListener('resize', createMatrix);
    return () => window.removeEventListener('resize', createMatrix);
  }, [createMatrix]);

  useEffect(() => {
    const title = titleRef.current;
    const wrapper = title?.parentElement;
    if (!title || !wrapper) return;

    const range = document.createRange();
    range.selectNodeContents(title);
    const updateTitleWidth = () => {
      const lineWidths = Array.from(
        range.getClientRects(),
        (line) => line.width,
      );
      const width = Math.max(0, ...lineWidths);
      if (width > 0) {
        wrapper.style.setProperty('--hero-title-width', `${width}px`);
      }
    };

    updateTitleWidth();
    const observer = new ResizeObserver(updateTitleWidth);
    observer.observe(title);
    document.fonts.addEventListener('loadingdone', updateTitleWidth);

    return () => {
      observer.disconnect();
      document.fonts.removeEventListener('loadingdone', updateTitleWidth);
    };
  }, []);

  return (
    <section className={classes.hero}>
      <div className={classes.hero_matrixContainer}>
        {matrixColumns.map((column) => (
          <div
            key={column.id}
            className={classes.matrixColumn}
            style={
              {
                '--col-index': column.id,
                '--col-count': matrixColumns.length,
                animationDelay: column.animationDelay,
                animationDuration: column.animationDuration,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <motion.div
        className={classes.hero_contentWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={compactContainerVariants}
      >
        <h1 ref={titleRef} className={classes.hero_title}>
          {'Информация для путешествия\nв Республику Корея'}
        </h1>
        <motion.div
          className={classes.hero_contentBox}
          variants={slideUpItemVariants}
          transition={{ type: 'tween', duration: 0.2 }}
          whileHover={{ x: -6 }}
        >
          <p className={classes.hero_contentBoxText}>
            На нашем сайте вы найдёте полезную информацию для поездки в
            Республику Корея, а может просто получите немного вдохновения для
            своего следующего путешествия в эту прекрасную страну
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
