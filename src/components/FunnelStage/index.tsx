import React, { useCallback, useEffect, useState } from 'react';
import { FiAlertTriangle, FiChevronRight } from 'react-icons/fi';
import { MdFunctions } from 'react-icons/md';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import api from '../../services/api';

import { Container, Card, CardContainer } from './styles';

interface IProps {
  stage: IFunnelStageDTO;
  selectedCard: IStageCardDTO;
  handleCardPage: Function;
  handleSelectCard: Function;
}

const FunnelStage: React.FC<IProps> = ({
  stage,
  handleCardPage,
  handleSelectCard,
  selectedCard,
}) => {
  const [cards, setCards] = useState<IStageCardDTO[]>([]);

  const getStageCards = useCallback(() => {
    try {
      api.get(`/funnels/${stage.id}/cards`).then(response => {
        setCards(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [stage]);

  useEffect(() => {
    getStageCards();
  }, [getStageCards]);

  return (
    <Container>
      <h1>
        <strong>
          <FiAlertTriangle size={14} />
        </strong>
        {stage.name}
        <strong>
          <MdFunctions size={14} />
        </strong>
      </h1>
      <CardContainer>
        {cards.map(card => (
          <Card isActive={selectedCard.id === card.id}>
            <button type="button" onClick={() => handleSelectCard(card)}>
              <h3>{card.name}</h3>
              <p>
                Responsável: <strong>{card.card_owner}</strong>
              </p>
            </button>
            <button type="button" onClick={() => handleCardPage(card)}>
              <FiChevronRight size={24} />
            </button>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default FunnelStage;
