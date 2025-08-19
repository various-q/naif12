import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, useTranslation } from '../lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDirection: () => 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const { t, getDirection } = useTranslation(language);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Update HTML direction
    document.documentElement.dir = getDirection();
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = getDirection();
    document.documentElement.lang = language;
  }, [language, getDirection]);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    getDirection,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};