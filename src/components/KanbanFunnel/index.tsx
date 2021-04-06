import React from 'react';

import { Container } from './styles';
import FunnelStage from '../FunnelStage';
import { useFunnel } from '../../hooks/funnel';

const KanbanFunnel: React.FC = () => {
  const { funnels, selectedFunnel } = useFunnel();
  const thisFunnel = funnels.find(
    xFunnel => xFunnel.name === selectedFunnel.name,
  );

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
    <Container>
      {selectedFunnel && selectedFunnel.id && (
        <>
          <FunnelStage stage={first} />
          <FunnelStage stage={second} />
          <FunnelStage stage={third} />
          <FunnelStage stage={fourth} />
          <FunnelStage stage={fifth} />
        </>
      )}
    </Container>
  );
};

export default KanbanFunnel;
