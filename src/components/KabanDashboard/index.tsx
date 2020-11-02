import React from 'react';
import KanbanFunnel from '../KanbanFunnel';

import { Container } from './styles';

interface IProps {
  funnel: string;
}

const KanbanDashboard: React.FC<IProps> = ({ funnel }) => {
  return (
    <Container>
      <KanbanFunnel funnel={funnel} />
    </Container>
  );
};

export default KanbanDashboard;
