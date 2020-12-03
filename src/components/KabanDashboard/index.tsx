import React from 'react';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import KanbanFunnel from '../KanbanFunnel';

import { Container, BottomLine, UpperLine } from './styles';

interface IProps {
  funnel: string;
  handleCardPage: Function;
  handleSelectCard: Function;
  selectedCard: IStageCardDTO;
}

const KanbanDashboard: React.FC<IProps> = ({
  funnel,
  handleCardPage,
  handleSelectCard,
  selectedCard,
}) => {
  return (
    <>
      <UpperLine />
      <Container>
        <KanbanFunnel
          funnel={funnel}
          handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
          handleSelectCard={(e: IStageCardDTO) => handleSelectCard(e)}
          selectedCard={selectedCard}
        />
      </Container>
      <BottomLine />
    </>
  );
};

export default KanbanDashboard;
