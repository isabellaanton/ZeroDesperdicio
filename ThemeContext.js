import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './theme'; 

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carrega o tema salvo ao abrir o app
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme_mode');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.log('Erro ao carregar tema:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem('@theme_mode', newMode ? 'dark' : 'light');
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (isLoading) return null; // Evita piscar a tela errada no load

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para facilitar o uso nas telas
export const useTheme = () => useContext(ThemeContext);