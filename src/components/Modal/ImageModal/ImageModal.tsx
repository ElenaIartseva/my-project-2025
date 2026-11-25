'use client';
import Image from 'next/image';
import { Modal } from '@components/Modal';
import { ImageModalProps } from './ImageModal.props';
import classes from './ImageModal.module.scss';

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  image,
}) => {
  if (!isOpen || !image) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={classes.imageModal}>
        <div className={classes.imageContainer}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            placeholder={image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={image.blurDataURL}
            sizes="(max-width: 1024px) 80vw, 60vw"
            style={{ objectFit: 'contain' }}
            className={classes.modalImage}
          />
        </div>
        {image.alt && <p className={classes.imageCaption}>{image.alt}</p>}
      </div>
    </Modal>
  );
};
