import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { I18nProvider } from "./state/i18nContext.jsx";
import { AuthProvider } from "./state/authContext.jsx";
import { AdsProvider } from "./state/adsContext.jsx";
import AppRoutes from "./router/AppRoutes.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import CategoriesNavbar from "./components/layout/CategoriesNavbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import BottomNavigation from "./components/layout/BottomNavigation.jsx";
import "./styles/globals.css";

// Component to conditionally render layout
const AppLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <CategoriesNavbar />}
      <main className="flex-1 pb-20">
        <AppRoutes />
      </main>
      {!isAuthPage && <Footer />}
      <BottomNavigation />
    </div>
  );
};

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <AdsProvider>
          <Router>
            <AppLayout />
          </Router>
        </AdsProvider>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
