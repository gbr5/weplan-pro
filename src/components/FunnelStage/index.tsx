import React from 'react';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';

import { Container, Card } from './styles';

interface IProps {
  stage: IFunnelStageDTO;
}

const FunnelStage: React.FC<IProps> = ({ stage }) => {
  return (
    <Container>
      <h1>{stage.name}</h1>
      {stage.cards.map(card => (
        <Card>
          <h2>Nome: {card.name}</h2>
          <p>Responsável: {card.card_owner}</p>
        </Card>
      ))}
    </Container>
  );
};

export default FunnelStage;
