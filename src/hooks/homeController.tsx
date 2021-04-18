import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { trimCardName } from '../utils/trimCardName';
import { useCompanyEmployee } from './companyEmployee';
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
  const { master } = useCompanyEmployee();
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
      page === 'E-Links' && history.push(`/e-links`);
      selectedCard &&
        selectedCard.id &&
        page === 'Card' &&
        history.push(`/card/${trimCardName(selectedCard.name)}`);
      selectedFunnel &&
        selectedFunnel.id &&
        page === 'Comercial' &&
        history.push(`/funnel/comercial`);
      page === 'Settings' && history.push(`/settings`);
      selectedFunnel &&
        selectedFunnel.id &&
        page === 'ComercialSettings' &&
        history.push(`/settings/comercial`);
      master && master.id && page === 'Employees' && history.push('/employees');
    },
    [history, selectedFunnel, selectedCard, master],
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
