import React from 'react';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import KanbanFunnel from '../KanbanFunnel';

import { Container, BottomLine, UpperLine } from './styles';

interface IProps {
  funnel: string;
  handleCardPage: Function;
}

const KanbanDashboard: React.FC<IProps> = ({ funnel, handleCardPage }) => {
  return (
    <>
      <UpperLine />
      <Container>
        <KanbanFunnel
          funnel={funnel}
          handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        />
      </Container>
      <BottomLine />
    </>
  );
};

export default KanbanDashboard;
