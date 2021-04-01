import React from 'react';

import { Container } from './styles';
import FunnelStage from '../FunnelStage';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import { useFunnel } from '../../hooks/funnel';

interface IProps {
  funnel: string;
  handleCardPage: Function;
}

const KanbanFunnel: React.FC<IProps> = ({ funnel, handleCardPage }) => {
  const { funnels } = useFunnel();
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
    <Container>
      <FunnelStage
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={first}
      />
      <FunnelStage
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={second}
      />
      <FunnelStage
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={third}
      />
      <FunnelStage
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={fourth}
      />
      <FunnelStage
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={fifth}
      />
    </Container>
  );
};

export default KanbanFunnel;
