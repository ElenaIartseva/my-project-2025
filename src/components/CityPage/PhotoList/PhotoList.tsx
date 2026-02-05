'use client';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PhotoListProps } from '../CityPage.props';
import { ImageModal } from '../../Modal/ImageModal/ImageModal';
import classes from './PhotoList.module.scss';

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
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export const PhotoList: React.FC<PhotoListProps> = ({ city }) => {
  const [selectedImage, setSelectedImage] = useState<{
    src: StaticImageData;
    alt: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!city.images || city.images.length === 0) {
    return null;
  }

  const handleImageClick = (image: { src: StaticImageData; alt: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className={classes.photoList}>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className={classes.photoList_container}
        >
          {city.images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className={classes.photoList_card}
              onClick={() => handleImageClick(image)}
            >
              <div className={classes.photoList_imageContainer}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={classes.photoList_image}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
    </>
  );
};
