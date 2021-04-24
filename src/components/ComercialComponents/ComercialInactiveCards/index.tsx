import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import IStageCardDTO from '../../../dtos/IStageCardDTO';
import { useHomeController } from '../../../hooks/homeController';
import { useStageCard } from '../../../hooks/stageCard';
import { trimCardName } from '../../../utils/trimCardName';

import { Container, SuccessButton, Card, CardsContainer } from './styles';

const ComercialInactiveCards: React.FC = () => {
  const history = useHistory();
  const { inactiveCards, selectCard } = useStageCard();
  const { selectPage } = useHomeController();
  const [filterBy, setFilterBy] = useState('all');
  const [filteredCards, setFilteredCards] = useState<IStageCardDTO[]>([]);

  const handleFilterBy = useCallback((e: string) => {
    setFilterBy(e);
  }, []);

  useEffect(() => {
    filterBy === 'all' && setFilteredCards(inactiveCards);
    filterBy === 'closed' &&
      setFilteredCards(
        inactiveCards.filter(card => card.result.isSuccessful === true),
      );
    filterBy === 'lost' &&
      setFilteredCards(
        inactiveCards.filter(card => card.result.isSuccessful === false),
      );
  }, [filterBy, inactiveCards]);

  const handleOpenCardPage = useCallback(
    (e: IStageCardDTO) => {
      selectCard(e);
      selectPage('Card');
      history.push(`/card/${trimCardName(e.name)}`);
    },
    [selectCard, history, selectPage],
  );

  return (
    <Container>
      <span>
        <SuccessButton
          isActive={filterBy === 'all'}
          type="button"
          onClick={() => handleFilterBy('all')}
        >
          Todos
        </SuccessButton>
        <SuccessButton
          isActive={filterBy === 'closed'}
          type="button"
          onClick={() => handleFilterBy('closed')}
        >
          Fechados
        </SuccessButton>
        <SuccessButton
          isActive={filterBy === 'lost'}
          type="button"
          onClick={() => handleFilterBy('lost')}
        >
          Perdidos
        </SuccessButton>
      </span>

      <CardsContainer>
        {filteredCards.map(card => {
          return (
            <Card
              key={card.id}
              type="button"
              onClick={() => handleOpenCardPage(card)}
            >
              <strong>{card.name}</strong>
              <FiChevronRight size={32} />
            </Card>
          );
        })}
      </CardsContainer>
    </Container>
  );
};

export default ComercialInactiveCards;
