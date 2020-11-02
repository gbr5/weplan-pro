import React, { HTMLAttributes, MouseEventHandler } from 'react';
import Funnel from '../Funnel';

import { Container } from './styles';

interface ComercialDashboardProps extends HTMLAttributes<HTMLDivElement> {
  containerStyle?: object;
  onHandleCloseWindow?: MouseEventHandler;
}

const ComercialDashboard: React.FC<ComercialDashboardProps> = () => {
  return (
    <Container>
      <Funnel />
    </Container>
  );
};

export default ComercialDashboard;
