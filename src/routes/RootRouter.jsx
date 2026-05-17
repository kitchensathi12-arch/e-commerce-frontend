import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// lazy load the layout component
// ------------ all layout load at the top ----------------
const UserLayout = lazy(() => import('@/routes/layout/UserLayout'));
const AuthLayout = lazy(() => import('@/routes/layout/AuthLayout'));

// ---------------- all pages load here -----------------
const Home = lazy(() => import('@/pages/users/Home'));
const ProductDetail = lazy(() => import('@/pages/users/ProductDetail'));
const Cart = lazy(() => import('@/pages/users/Cart'));
const Wishlist = lazy(() => import('@/pages/users/Wishlist'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));

const RootRouter = () => {
  const routes = [
    // ----------------------- user layout and all users routes here ------------

    {
      path: '/',
      element: (
        <Suspense fallback="Loading...">
          <UserLayout>
            <Home />
          </UserLayout>
        </Suspense>
      ),
    },
    {
      path: '/product-detail/:id',
      element: (
        <Suspense fallback="Loading...">
          <UserLayout>

          <ProductDetail />
          </UserLayout>
        </Suspense>
      ),
    },
    {
      path: '/cart',
      element: (
        <Suspense fallback="Loading...">
          <UserLayout>
            <Cart />
          </UserLayout>
        </Suspense>
      ),
    },
    {
      path: '/wishlist',
      element: (
        <Suspense fallback="Loading...">
          <UserLayout>
            <Wishlist />
          </UserLayout>
        </Suspense>
      ),
    },


    // ----------------------- all authentication routes start here ------------------

    
    {
      path: "/login",
      element: (<Suspense fallback="loading">
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </Suspense>)
    },
    {
      path: "/register",
      element: (<Suspense fallback="loading">
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      </Suspense>)
    },
  ];
  return useRoutes(routes);
};

export default RootRouter;
