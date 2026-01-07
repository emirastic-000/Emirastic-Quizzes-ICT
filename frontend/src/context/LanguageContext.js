import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Language is now fixed to English for the interface
  const [language] = useState('en');

  // Helper function to get translations
  const t = (key) => getTranslation(language, key);

  const value = {
    language,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
