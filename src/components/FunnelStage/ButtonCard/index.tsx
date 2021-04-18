import React, { useCallback } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import IStageCardDTO from '../../../dtos/IStageCardDTO';
import { useHomeController } from '../../../hooks/homeController';
import { useStageCard } from '../../../hooks/stageCard';
import { trimCardName } from '../../../utils/trimCardName';

import { Container } from './styles';

interface IProps {
  card: IStageCardDTO;
}

const ButtonCard: React.FC<IProps> = ({ card }) => {
  const history = useHistory();
  const { selectPage } = useHomeController();
  const { selectedCard, selectCard } = useStageCard();

  const handleSelectCard = useCallback(
    (e: IStageCardDTO) => {
      selectCard(e);
      setTimeout(selectPage('Card'), 10000);
      history.push(`/card/${trimCardName(e.name)}`);
    },
    [selectCard, history, selectPage],
  );
  return (
    <Container isActive={card.id === selectedCard.id}>
      <button type="button" onClick={() => selectCard(card)}>
        <h3>{card.name}</h3>
        <strong>{card.weplanEvent ? 'WP' : ''}</strong>
      </button>
      <button type="button" onClick={() => handleSelectCard(card)}>
        <FiChevronRight size={28} />
      </button>
    </Container>
  );
};

export default ButtonCard;
