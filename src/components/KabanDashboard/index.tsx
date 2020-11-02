import React from 'react';
import KanbanFunnel from '../KanbanFunnel';

import { Container, BottomLine, UpperLine } from './styles';

interface IProps {
  funnel: string;
}

const KanbanDashboard: React.FC<IProps> = ({ funnel }) => {
  return (
    <>
      <UpperLine />
      <Container>
        <KanbanFunnel funnel={funnel} />
      </Container>
      <BottomLine />
    </>
  );
};

export default KanbanDashboard;
