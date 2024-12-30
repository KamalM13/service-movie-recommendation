import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./not-found";
import Auth from "./pages/Auth";
import { useAuth } from "./context/AuthContext";
import AdminPanel from "./pages/Admin/Admin";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import Accounts from "./pages/Admin/Accounts";
import PrivacyPolicy from "./pages/Others/PrivacyPolicy";
import TermsOfService from "./pages/Others/TermsNServices";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Contact from "./pages/Others/Contact";
import About from "./pages/Others/About";
import ProfilePage from "./pages/Profile/[id]";
import MoviePage from "./pages/Movie/[id]/page";
import FilmsPage from "./pages/Films/page";

export default function App() {
  const auth = useAuth();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        {auth.isLoggedIn && (
          <>
            <Route path="/settings" element={<Settings />} />
            <Route path="/account/:id" element={<ProfilePage />} />
          </>
        )}

        {auth.user?.isAdmin && (
          <>
            <Route path="/Admin" element={<AdminPanel />} />

            <Route path="/Admin/accounts" element={<Accounts />} />
          </>
        )}


        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
