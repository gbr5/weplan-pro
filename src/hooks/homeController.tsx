import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useFunnel } from './funnel';
import { useStageCard } from './stageCard';

interface IHomeControllerContextData {
  selectedPage: string;
  selectPage(page: string): void;
}

const HomeControllerContext = createContext<IHomeControllerContextData>(
  {} as IHomeControllerContextData,
);

const HomeControllerProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const { selectedFunnel } = useFunnel();
  const { selectedCard } = useStageCard();
  const [selectedPage, setSelectedPage] = useState(() => {
    const currentPage = localStorage.getItem('@WP-PRO:current-page');

    if (currentPage) {
      return currentPage;
    }
    return 'Home';
  });

  const selectPage = useCallback(async (page: string) => {
    setSelectedPage(page);
    localStorage.setItem('@WP-PRO:current-page', page);
  }, []);

  useEffect(() => {
    const currentPage = localStorage.getItem('@WP-PRO:current-page');
    if (
      currentPage &&
      selectedFunnel &&
      selectedFunnel.id &&
      selectedCard &&
      selectedCard.id
    ) {
      setSelectedPage(currentPage);
      // history.push(`/card/${selectedCard.name}`);
    }
  }, [selectedCard, history, selectedFunnel]);

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
