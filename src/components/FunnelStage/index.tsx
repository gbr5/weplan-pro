import React from 'react';
import { FiAlertTriangle, FiChevronRight } from 'react-icons/fi';
import { MdFunctions } from 'react-icons/md';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';

import { Container, Card, CardContainer } from './styles';

interface IProps {
  stage: IFunnelStageDTO;
}

const FunnelStage: React.FC<IProps> = ({ stage }) => {
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
        {stage.cards.map(card => (
          <Card>
            <div>
              <h3>{card.name}</h3>
              <p>
                Responsável: <strong>{card.card_owner}</strong>
              </p>
            </div>
            <button type="button">
              <FiChevronRight size={24} />
            </button>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default FunnelStage;
