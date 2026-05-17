import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import CartWishlistPage from '@/pages/test';

// lazy load the layout component
const UserLayout = lazy(() => import('@/routes/layout/UserLayout'));
const Home = lazy(() => import('@/pages/users/Home'));
const ProductDetail = lazy(() => import('@/pages/users/ProductDetail'));
const Cart = lazy(() => import('@/pages/users/Cart'));
const Wishlist = lazy(() => import('@/pages/users/Wishlist'));

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
        {
          path: '/cart',
          element: (
            <Suspense fallback="Loading...">
              <Cart />
            </Suspense>
          ),
        },
        {
          path: '/wishlist',
          element: (
            <Suspense fallback="Loading...">
              <Wishlist />
            </Suspense>
          ),
        }
      ],
    },
    {
      path:"/test",
      element:<CartWishlistPage/>
    }
  ];
  return useRoutes(routes);
};

export default RootRouter;
