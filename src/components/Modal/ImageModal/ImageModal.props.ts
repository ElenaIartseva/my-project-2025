import type { CityImage } from '@components/CityPage/CityPage.props';

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Pick<CityImage, 'src' | 'alt' | 'blurDataURL'> | null;
}
