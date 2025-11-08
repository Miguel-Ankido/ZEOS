import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Cria o Contexto
const ThemeContext = createContext();

// 2. Cria o Provedor (o "Cérebro")
export const ThemeProvider = ({ children }) => {
  // 3. Tenta ler o tema salvo no localStorage, ou usa 'light' como padrão
  const [theme, setTheme] = useState(
    () => localStorage.getItem('zeos-theme') || 'light'
  );

  // 4. Efeito que roda QUANDO o 'theme' mudar
  useEffect(() => {
    // Salva a escolha no localStorage
    localStorage.setItem('zeos-theme', theme);

    // 5. A MÁGICA: Adiciona ou remove a classe 'dark-theme' do <body>
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  // 6. A função que o botão vai chamar
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 7. Hook customizado (para facilitar o uso)
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  return useContext(ThemeContext);
};