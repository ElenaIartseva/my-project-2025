import { StaticImageData } from 'next/image';

export interface CityImage {
  id: number;
  src: StaticImageData;
  alt: string;
}

export interface CityVideo {
  id: number;
  src: string;
  img: StaticImageData;
}

export interface City {
  id: number;
  path: string;
  link: string;
  name: string;
  text0: string;
  text1?: string;
  text2?: string;
  images: CityImage[];
  video: CityVideo[];
}

export interface PhotoListProps {
  city: {
    images?: CityImage[];
  };
}

export interface VideoListProps {
  city: {
    video?: CityVideo[];
  };
}
