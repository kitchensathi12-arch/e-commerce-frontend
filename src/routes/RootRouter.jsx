import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import KitchenSaathiLoader from '@/components/ui/LoadingPage';

// lazy load the layout component
// ------------ all layout load at the top ----------------
const UserLayout = lazy(() => import('@/routes/layout/UserLayout'));
const AuthLayout = lazy(() => import('@/routes/layout/AuthLayout'));
const AdminLayout = lazy(() => import('@/routes/layout/AdminLayout'));

// ---------------- all pages load here -----------------
const Home = lazy(() => import('@/pages/users/Home'));
const ProductDetail = lazy(() => import('@/pages/users/ProductDetail'));
const Cart = lazy(() => import('@/pages/users/Cart'));
const Wishlist = lazy(() => import('@/pages/users/Wishlist'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));

// ---------------- all admin pages load here -----------------
const Dashboard  = lazy(() => import('@/pages/admin/Dashboard'));
const Products   = lazy(() => import('@/pages/admin/Products'));
const Categories = lazy(() => import('@/pages/admin/Categories'));
const Brands     = lazy(() => import('@/pages/admin/Brands'));

import AdminRoutes from '@/routes/AdminRoutes';
import Orders from '@/pages/admin/Orders';
import Banners from '@/pages/admin/Banners';
import Bin from '@/pages/admin/Bin';

const RootRouter = () => {
  const routes = [
    // ----------------------- user layout and all users routes here ------------

    {
      path: '/',
      element: (
        <Suspense fallback={<KitchenSaathiLoader/>}>
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

    // ----------------------- all admin routes start here ------------------

    {
      path: '/admin',
      element: (
        <Suspense fallback={<KitchenSaathiLoader/>}>
          <AdminRoutes>
            <AdminLayout />
          </AdminRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<KitchenSaathiLoader/>}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: 'products',
          element: (
            <Suspense fallback={<KitchenSaathiLoader/>}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: 'categories',
          element: (
            <Suspense fallback={<KitchenSaathiLoader/>}>
              <Categories />
            </Suspense>
          ),
        },
        {
          path: 'brands',
          element: (
            <Suspense fallback={<KitchenSaathiLoader/>}>
              <Brands />
            </Suspense>
          ),
        },
        {
          path: 'orders',
          element: (
            <Suspense fallback={<KitchenSaathiLoader/>}>
              <Orders />
            </Suspense>
          ),
        },
        {
          path: 'banners',
          element: (
            <Suspense fallback={<KitchenSaathiLoader/>}>
              <Banners />
            </Suspense>
          ),
        },
        {
          path: 'bin',
          element: (
            <Suspense fallback={<KitchenSaathiLoader/>}>
              <Bin />
            </Suspense>
          ),
        },
        
      ],
    },
  ];

  

  return useRoutes(routes);
};

export default RootRouter;