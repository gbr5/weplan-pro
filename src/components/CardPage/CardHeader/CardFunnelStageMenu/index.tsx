import React from 'react';
import { useFunnel } from '../../../../hooks/funnel';
import { useStageCard } from '../../../../hooks/stageCard';
import { Container, StageButton } from './styles';

const CardFunnelStageMenu: React.FC = () => {
  const { selectedFunnel } = useFunnel();
  const { selectedCard, updateCardStage } = useStageCard();

  return (
    <Container>
      {selectedFunnel &&
        selectedFunnel.stages.map(stage => (
          <StageButton
            isActive={stage.id === selectedCard.stage_id}
            key={stage.id}
          >
            <button onClick={() => updateCardStage(stage)} type="button">
              {stage.name}
            </button>
          </StageButton>
        ))}
    </Container>
  );
};

export default CardFunnelStageMenu;
