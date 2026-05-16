import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Main from '@/pages/users/test';

// lazy load the layout component
const UserLayout = lazy(() => import('@/routes/layout/UserLayout'));
const Home = lazy(() => import('@/pages/users/Home'));
const ProductDetail = lazy(() => import('@/pages/users/ProductDetail'));

const RootRouter = () => {
  const routes = [
    {
      path: '/',
      element: (
        <Suspense fallback="Loading...">
          <UserLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback="Loading...">
              <Home />
            </Suspense>
          ),
        },
        {
          path: '/product-detail/:id',
          element: (
            <Suspense fallback="Loading...">
              <ProductDetail />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/test',

      element: <Main />,
    },
  ];
  return useRoutes(routes);
};

export default RootRouter;
