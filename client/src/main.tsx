import React, { useEffect, createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Footer from "./components/Main/Footer.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import "./index.css";
import { Toaster } from "sonner";
import "./i18n";
//import LanguageModal from "./components/LanguageModal/index.tsx";
import { PrimeReactProvider } from "primereact/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PoweredByNovaTech from "./components/Main/PoweredByNovaTech.tsx";
import { SiteHeader } from "./components/Main/Header.tsx";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const Root = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const [cookies] = useCookies(["access_token"]);
  const [themeCookie, setThemeCookie] = useCookies(["theme"]);
  const [theme, setTheme] = useState(themeCookie.theme || "light");
  //const [languageCookie] = useCookies(["language"]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeCookie("theme", newTheme, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      path: "/",
    });
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageProvider>
          <AuthProvider authToken={cookies.access_token}>
            <BrowserRouter>
              <PrimeReactProvider>
                <SiteHeader/>
                <App />
                <Footer />
                <PoweredByNovaTech />
                <Toaster />
              </PrimeReactProvider>
              {/* {!languageCookie.language && <LanguageModal />} */}
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export const useTheme = () => useContext(ThemeContext);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <div className="dark:bg-neutral-900 bg-neutral-900 text-white dark:text-white">
      <Root />
    </div>
  </GoogleOAuthProvider>
);
