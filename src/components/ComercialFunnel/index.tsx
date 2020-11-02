import React from 'react';

import { Container, BottomLine } from './styles';
import FunnelStage from '../FunnelStage';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';

interface IProps {
  stages: IFunnelStageDTO[];
}

const Funnel: React.FC = ({ children }) => {
  return (
    <>
      <Container>
        <FunnelStage>{children}</FunnelStage>
        <FunnelStage>{children}</FunnelStage>
        <FunnelStage>{children}</FunnelStage>
        <FunnelStage>{children}</FunnelStage>
        <FunnelStage>{children}</FunnelStage>
      </Container>
      <BottomLine />
    </>
  );
};

export default Funnel;
