import { join } from 'node:path';
import sharp from 'sharp';
import type { City } from '@components/CityPage/CityPage.props';

const getPreview = async (src: string) => {
  const thumbnail = await sharp(join(process.cwd(), 'public', src))
    .resize(12, 12, { fit: 'inside' })
    .webp({ quality: 45 })
    .toBuffer();

  return `data:image/webp;base64,${thumbnail.toString('base64')}`;
};

export async function withMediaPreviews(city: City): Promise<City> {
  const [images, video] = await Promise.all([
    Promise.all(
      city.images.map(async (image) => ({
        ...image,
        blurDataURL: await getPreview(image.src),
      })),
    ),
    Promise.all(
      city.video.map(async (item) => ({
        ...item,
        blurDataURL: await getPreview(item.img),
      })),
    ),
  ]);

  return { ...city, images, video };
}
