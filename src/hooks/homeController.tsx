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
  const { selectedFunnel, comercialFunnel } = useFunnel();
  const { selectedCard } = useStageCard();
  const [selectedPage, setSelectedPage] = useState(() => {
    const currentPage = localStorage.getItem('@WP-PRO:current-page');

    if (currentPage) {
      return currentPage;
    }
    return 'Home';
  });

  const selectPage = useCallback(
    async (page: string) => {
      setSelectedPage(page);
      localStorage.setItem('@WP-PRO:current-page', page);
      const trimmedCardName =
        selectedCard &&
        selectedCard.id &&
        selectedCard.name.toLowerCase().replace(/ /g, '-');
      selectedCard &&
        selectedCard.id &&
        page === 'Card' &&
        history.push(`/card/${trimmedCardName}`);
      selectedFunnel &&
        selectedFunnel.id &&
        page === 'Comercial' &&
        history.push(`/funnel/comercial`);
      page === 'Settings' && history.push(`/settings`);
      comercialFunnel &&
        comercialFunnel.id &&
        page === 'ComercialSettings' &&
        history.push(`/settings/comercial`);
    },
    [history, selectedFunnel, comercialFunnel, selectedCard],
  );

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
