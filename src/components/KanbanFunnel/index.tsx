import React from 'react';

import { Container } from './styles';
import FunnelStage from '../FunnelStage';
import { useAuth } from '../../hooks/auth';
import IStageCardDTO from '../../dtos/IStageCardDTO';

interface IProps {
  funnel: string;
  handleCardPage: Function;
  handleSelectCard: Function;
  selectedCard: IStageCardDTO;
}

const KanbanFunnel: React.FC<IProps> = ({
  funnel,
  handleCardPage,
  handleSelectCard,
  selectedCard,
}) => {
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
    <Container>
      <FunnelStage
        handleSelectCard={(e: IStageCardDTO) => handleSelectCard(e)}
        selectedCard={selectedCard}
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={first}
      />
      <FunnelStage
        handleSelectCard={(e: IStageCardDTO) => handleSelectCard(e)}
        selectedCard={selectedCard}
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={second}
      />
      <FunnelStage
        handleSelectCard={(e: IStageCardDTO) => handleSelectCard(e)}
        selectedCard={selectedCard}
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={third}
      />
      <FunnelStage
        handleSelectCard={(e: IStageCardDTO) => handleSelectCard(e)}
        selectedCard={selectedCard}
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={fourth}
      />
      <FunnelStage
        handleSelectCard={(e: IStageCardDTO) => handleSelectCard(e)}
        selectedCard={selectedCard}
        handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
        stage={fifth}
      />
    </Container>
  );
};

export default KanbanFunnel;
