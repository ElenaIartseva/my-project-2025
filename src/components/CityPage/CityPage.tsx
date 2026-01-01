'use client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PhotoList } from '@/components/CityPage/PhotoList';
import { VideoList } from '@/components/CityPage/VideoList';
import { cityList } from '@/utils/constants';
import { useParams } from 'next/navigation';
import classes from '@/components/CityPage/CityPage.module.scss';

export const CityPage = () => {
  const params = useParams();
  const cityPath = params.city as string;

  const cityData = cityList.find((item) => item.path === cityPath);

  if (!cityData) {
    return (
      <section className={classes.cityPage}>
        <Header />
        <div className={classes.cityAbout}>
          <h2 className={classes.cityAbout_title}>Город не найден</h2>
        </div>
        <Footer />
      </section>
    );
  }

  const hasImages = cityData.images && cityData.images.length > 0;
  const hasVideos = cityData.video && cityData.video.length > 0;

  return (
    <section className={classes.cityPage}>
      <Header />
      <div className={classes.cityAbout}>
        <h2 className={classes.cityAbout_title}>{cityData.name}</h2>
        <p className={classes.cityAbout_text}>{cityData.text0}</p>
        <p className={classes.cityAbout_text}>{cityData.text1}</p>
        <p className={classes.cityAbout_text}>{cityData.text2}</p>
      </div>
      {hasImages && (
        <>
          <p className={`${classes.cityAbout_text} ${classes.text_shine}`}>
            кликни по фото, чтобы увеличить его
          </p>
          <PhotoList city={cityData} />
        </>
      )}
      {hasVideos && (
        <>
          <p className={`${classes.cityAbout_text} ${classes.text_shine}`}>
            кликни по видео, чтобы посмотреть его
          </p>
          <VideoList city={cityData} />
        </>
      )}
      <Footer />
    </section>
  );
};
