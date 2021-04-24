import React, { useCallback, useState } from 'react';
import { useFunnel } from '../../hooks/funnel';
import ComercialBottomSection from '../ComercialBottomSection';
import ComercialInactiveCards from '../ComercialComponents/ComercialInactiveCards';
import Header from '../Header';
import KanbanFunnel from '../KanbanFunnel';
import ActiveCardsMenu from './ActiveCardsMenu';

import { Container, BottomLine, UpperLine, FunnelTitle } from './styles';

const ComercialKanbanDashboard: React.FC = () => {
  const { selectedFunnel } = useFunnel();
  const [activeCards, setActiveCards] = useState(true);

  const handleActiveCards = useCallback((e: boolean) => {
    setActiveCards(e);
  }, []);

  return (
    <>
      <Header />
      <FunnelTitle>{selectedFunnel.name}</FunnelTitle>
      <ActiveCardsMenu
        isActive={activeCards}
        handleActiveCards={handleActiveCards}
      />
      {activeCards ? (
        <>
          <UpperLine />
          <Container>
            {selectedFunnel && selectedFunnel.id && <KanbanFunnel />}
          </Container>
          <BottomLine />
          <ComercialBottomSection />
        </>
      ) : (
        <ComercialInactiveCards />
      )}
    </>
  );
};

export default ComercialKanbanDashboard;
