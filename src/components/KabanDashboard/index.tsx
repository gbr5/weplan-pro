import React from 'react';
import { useFunnel } from '../../hooks/funnel';
import ComercialBottomSection from '../ComercialBottomSection';
import Header from '../Header';
import KanbanFunnel from '../KanbanFunnel';

import { Container, BottomLine, UpperLine, FunnelTitle } from './styles';

const KanbanDashboard: React.FC = () => {
  const { selectedFunnel } = useFunnel();
  return (
    <>
      <Header />
      <FunnelTitle>{selectedFunnel.name}</FunnelTitle>
      <UpperLine />
      <Container>{selectedFunnel && <KanbanFunnel />}</Container>
      <BottomLine />
      <ComercialBottomSection />
    </>
  );
};

export default KanbanDashboard;
