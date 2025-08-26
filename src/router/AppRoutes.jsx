import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Skeleton from "../components/common/Skeleton.jsx";

// Lazy load pages for better performance
const Home = React.lazy(() => import("../pages/Home.jsx"));
const Categories = React.lazy(() => import("../pages/Categories.jsx"));
const Listings = React.lazy(() => import("../pages/Listings.jsx"));
const AdDetails = React.lazy(() => import("../pages/AdDetails.jsx"));
const CreateAd = React.lazy(() => import("../pages/CreateAd.jsx"));
const Login = React.lazy(() => import("../pages/Login.jsx"));
const Register = React.lazy(() => import("../pages/Register.jsx"));
const Subscribe = React.lazy(() => import("../pages/Subscribe.jsx"));
const Profile = React.lazy(() => import("../pages/Profile.jsx"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/categories"
          element={
            <PageTransition>
              <Categories />
            </PageTransition>
          }
        />
        <Route
          path="/listings"
          element={
            <PageTransition>
              <Listings />
            </PageTransition>
          }
        />
        <Route
          path="/ad/:id"
          element={
            <PageTransition>
              <AdDetails />
            </PageTransition>
          }
        />
        <Route
          path="/create"
          element={
            <PageTransition>
              <CreateAd />
            </PageTransition>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/subscribe"
          element={
            <PageTransition>
              <Subscribe />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <PageTransition>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="btn-primary">
                    Go Home
                  </a>
                </div>
              </div>
            </PageTransition>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
