import { CityPage } from '@components/CityPage/CityPage';
import { cityList } from '@utils/constantsCity';
import classes from '@app/App.module.scss';
import { notFound } from 'next/navigation';
import { withMediaPreviews } from './mediaPreviews';

interface CityRouteProps {
  params: Promise<{
    city: string;
  }>;
}

export function generateStaticParams() {
  return cityList.map((city) => ({
    city: city.path,
  }));
}

export default async function City({ params }: CityRouteProps) {
  const { city } = await params;
  const cityData = cityList.find((item) => item.path === city);

  if (!cityData) {
    notFound();
  }

  return (
    <>
      <div className={classes.app}>
        <CityPage city={await withMediaPreviews(cityData)} />
      </div>
    </>
  );
}
