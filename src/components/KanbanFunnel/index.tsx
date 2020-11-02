import React from 'react';

import { Container, BottomLine } from './styles';
import FunnelStage from '../FunnelStage';
import { useAuth } from '../../hooks/auth';

interface IProps {
  funnel: string;
}

const Funnel: React.FC<IProps> = ({ funnel }) => {
  const { funnels } = useAuth();
  const thisFunnel = funnels.find(xFunnel => xFunnel.name === funnel);

  if (!thisFunnel) {
    throw new Error('Funnel not found');
  }

  const first = thisFunnel.stages.find(stage => stage.funnel_order === '1');
  const second = thisFunnel.stages.find(stage => stage.funnel_order === '2');
  const third = thisFunnel.stages.find(stage => stage.funnel_order === '3');
  const fourth = thisFunnel.stages.find(stage => stage.funnel_order === '4');
  const fifth = thisFunnel.stages.find(stage => stage.funnel_order === '5');

  if (!first || !second || !third || !fourth || !fifth) {
    throw new Error('Funnel not found');
  }

  return (
    <>
      <Container>
        <FunnelStage>{first.name}</FunnelStage>
        <FunnelStage>{second.name}</FunnelStage>
        <FunnelStage>{third.name}</FunnelStage>
        <FunnelStage>{fourth.name}</FunnelStage>
        <FunnelStage>{fifth.name}</FunnelStage>
      </Container>
      <BottomLine />
    </>
  );
};

export default Funnel;
