import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import ForgotPassword from "@/components/auth/ForgotPassword";

import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import Cart from "@/components/ui/cart/Cart";
import About from "@/pages/About";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "@/services/AuthServices";
import VerifySuccess from "@/components/auth/VerifyEmail";
import ProductDetail from "@/pages/ProductsDetails";

import AdminLayout from "@/admin/AdminLayout";
import Dashboard from "@/admin/Dashboard";
import Brands from "@/admin/BrandPage/BrandPage";
import BannerPage from "@/admin/BannerPage/BannerPage";
import Profile from "@/admin/Profile";
import { useEffect } from "react";
import { AuthStore } from "@/store/store";
import CategoryPage from "@/admin/CategoryPage/CategoryPage";
import BinPage from "@/admin/BinPage";
import { Orders } from "@/admin/ManageOrders";
import Product from "@/admin/ProductPage/ProductPage";
import BrandSlider from "@/components/Home/BrandCategory";
import BrandProductsPage from "@/components/Home/BrandPageParticular";
import AccountPage from "@/components/Home/Account";
import Contact from "@/pages/Contact";
import Wishlist from "@/components/Home/Whislist";
import CheckOut from "@/components/Home/Checkout";
import type { IAuthDocument } from "@kitchensathi12-arch/ecommerce-types";
import ProductModal from "@/admin/ProductPage/ProductModal";
import ProductsListingPage from "@/pages/AllProducts";
import MyOrders from "@/pages/MyOrders";

const AppRoutes = () => {
  // ---------- here is am using zustand store ------------
  const { addUser, user } = AuthStore((state) => state);


  // ------------ here all the apis calls ---------
  const { data, isLoading } = useQuery({
    queryKey: ["userDetail"],
    queryFn: getLoggedInUser,
    enabled: !user,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      addUser(data.data?.user);
    }
  }, [addUser, data])

  if (isLoading) {
    return <div>Loading...</div>;
  };

  const isAuthenticated: IAuthDocument | undefined = user || data?.data?.user;

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/forgot-password"
        element={isAuthenticated ? <Navigate to="/" replace /> : <ForgotPassword />}
      />

      <Route
        path="/Email-verified"
        element={
          isAuthenticated ? <VerifySuccess /> : <Navigate to="/login" replace />
        }
      />

      {/* Protected User Routes */}
      <Route
        element={
          <MainLayout />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
        <Route path="all-products" element={<ProductsListingPage />} />
        <Route path="brand-detail" element={<BrandSlider />} />
        <Route path="brand-particular" element={<BrandProductsPage />} />
        <Route path="about" element={<About />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="my-orders" element={<MyOrders />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/"
        element={
          isAuthenticated && isAuthenticated?.role === "admin" ? <AdminLayout /> : <Navigate to="/login" replace />
        }
      >
        {/* <Route  element={<Navigate to="dashboard" replace />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="brands" element={<Brands />} />
        <Route path="products" element={<Product />} />
        <Route path="product/:id" element={<ProductModal />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="banners" element={<BannerPage />} />
        <Route path="bin" element={<BinPage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="certificates" element={<Orders />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
