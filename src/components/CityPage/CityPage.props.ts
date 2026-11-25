export interface CityImage {
  id: number;
  src: string;
  alt: string;
  blurDataURL?: string;
}

export interface CityVideo {
  id: number;
  src: string;
  img: string;
  blurDataURL?: string;
}

export interface City {
  id: number;
  path: string;
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
