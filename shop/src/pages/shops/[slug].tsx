import { Image } from '@components/ui/image';
import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import ShopSidebar from '@components/shops/sidebar';
export { getStaticPaths, getStaticProps } from '@framework/ssr/shop';
import { productPlaceholder } from '@lib/placeholders';
import ProductsGrid from '@components/products/grid';
import { getLayout } from '@components/layouts/layout';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

export default function ShopPage({ data }: any) {
  const router = useRouter();
  const { width } = useWindowSize();
  const { t } = useTranslation('banner');

  const isBook = router.asPath.includes('/book');

  return (
    <div className="flex flex-col bg-gray-100 lg:flex-row lg:items-start lg:p-8">
      <ShopSidebar data={data} className="sticky top-24 lg:top-28" />

      <div className="flex flex-col w-full p-4 lg:p-0 lg:ps-8">
        <div className="relative w-full h-full overflow-hidden rounded">
          <Image
            alt={t('heading')}
            src={data?.shop?.cover_image?.original! ?? productPlaceholder}
            layout="responsive"
            width={2340}
            height={870}
            className="w-full h-full"
          />
        </div>
        {data?.shop && (
          <ProductsGrid
            className="py-8"
            gridClassName={classNames(
              'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3',
              {
                'gap-6 md:gap-8': isBook,
              }
            )}
            shopId={data?.shop.id!}
          />
        )}
      </div>
      {width > 1023 && <CartCounterButton />}
    </div>
  );
}

ShopPage.getLayout = getLayout;
