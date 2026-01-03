'use client';
import { VideoListProps } from './VideoList.props';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { VideoPlayer } from '@/components/VideoPlayer/VideoPlayer';
import classes from './VideoList.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export const VideoList: React.FC<VideoListProps> = ({ city }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!city.video || city.video.length === 0) {
    return null;
  }

  const handleVideoClick = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <div className={classes.videoList}>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ amount: 0.1 }}
          variants={containerVariants}
          className={classes.videoList_container}
        >
          {city.video.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              whileHover={{ x: -6, scale: 1.02 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className={classes.videoList_card}
            >
              <div className={classes.videoWrapper}>
                <video className={classes.videoList_video} preload='metadata'>
                  <source src={video.src} type='video/webm' />
                  Упс, похоже Ваш браузер не поддерживает видео
                </video>
                <button
                  className={classes.btn_play}
                  onClick={() => handleVideoClick(video.src)}
                ></button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedVideo && (
          <VideoPlayer url={selectedVideo} isModalOpen={isModalOpen} />
        )}
      </Modal>
    </>
  );
};
