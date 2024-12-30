import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const LanguageContext = createContext({
  language: "en",
  setLanguage: (_language: string) => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookie] = useCookies(["language"]);
  const [language, setLanguage] = useState(cookies.language || "");

  useEffect(() => {
    setCookie("language", language, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      path: "/",
    });
  }, [language, setCookie]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
