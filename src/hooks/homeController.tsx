import React, { createContext, useCallback, useState, useContext } from 'react';

interface IHomeControllerContextData {
  selectedPage: string;
  selectPage(page: string): void;
}

const HomeControllerContext = createContext<IHomeControllerContextData>(
  {} as IHomeControllerContextData,
);

const HomeControllerProvider: React.FC = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState('Home');

  const selectPage = useCallback(async (page: string) => {
    setSelectedPage(page);
  }, []);

  return (
    <HomeControllerContext.Provider value={{ selectPage, selectedPage }}>
      {children}
    </HomeControllerContext.Provider>
  );
};

function useHomeController(): IHomeControllerContextData {
  const context = useContext(HomeControllerContext);

  if (!context) {
    throw new Error('useHomeController must be used within a theme provider');
  }

  return context;
}

export { HomeControllerProvider, useHomeController };
