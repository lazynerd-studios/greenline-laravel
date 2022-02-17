import HomeLayout from '@components/layouts/_home';
import Seo from '@components/seo/seo';
import useLayout from '@framework/utils/use-layout';
import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';
export { getStaticPaths, getStaticProps } from '@framework/ssr/pages';
const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);
const Classic = dynamic(() => import('@components/layouts/classic'));
const Standard = dynamic(() => import('@components/layouts/standard'));
const Modern = dynamic(() => import('@components/layouts/modern'));
const Minimal = dynamic(() => import('@components/layouts/minimal'));
const Compact = dynamic(() => import('@components/layouts/compact'));

const MAP_LAYOUT_TO_GROUP: Record<string, any> = {
  classic: Classic,
  modern: Modern,
  standard: Standard,
  minimal: Minimal,
  compact: Compact,
  default: Classic,
};
export default function Home() {
  const { query } = useRouter();
  const { width } = useWindowSize();
  const { layout, page } = useLayout();

  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo('grid', {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.text, query.category]);

  const Component = MAP_LAYOUT_TO_GROUP[layout];

  return (
    <>
      <Seo title={page?.name} url={page?.slug} images={page?.banners} />
      <Component />
      {!['compact', 'minimal'].includes(layout) && width > 1023 && (
        <CartCounterButton />
      )}
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};
