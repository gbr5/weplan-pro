import React from 'react';
import { useFunnel } from '../../hooks/funnel';
import KanbanFunnel from '../KanbanFunnel';

import { Container, BottomLine, UpperLine } from './styles';

const KanbanDashboard: React.FC = () => {
  const { selectedFunnel } = useFunnel();
  return (
    <>
      <UpperLine />
      <Container>{selectedFunnel && <KanbanFunnel />}</Container>
      <BottomLine />
    </>
  );
};

export default KanbanDashboard;
