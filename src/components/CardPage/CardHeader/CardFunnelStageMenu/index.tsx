import React, { useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import IFunnelStageDTO from '../../../../dtos/IFunnelStageDTO';
import { useFunnel } from '../../../../hooks/funnel';
import { useStageCard } from '../../../../hooks/stageCard';
import Backdrop from '../../../Backdrop';
import { Container, StageButton, CloseButton } from './styles';

interface IProps {
  closeComponent: Function;
}

const CardFunnelStageMenu: React.FC<IProps> = ({ closeComponent }) => {
  const { selectedFunnel } = useFunnel();
  const { selectedCard, updateCardStage } = useStageCard();

  const handleUpdateStage = useCallback(
    (stage: IFunnelStageDTO) => {
      updateCardStage(stage);
      closeComponent();
    },
    [closeComponent, updateCardStage],
  );

  return (
    <>
      <Backdrop handleCloseWindow={closeComponent} />
      <Container>
        <CloseButton type="button" onClick={() => closeComponent()}>
          <MdClose size={48} />
        </CloseButton>
        {selectedFunnel &&
          selectedFunnel.stages.map(stage => (
            <StageButton
              isActive={stage.id === selectedCard.stage_id}
              key={stage.id}
            >
              <button onClick={() => handleUpdateStage(stage)} type="button">
                {stage.name}
              </button>
            </StageButton>
          ))}
      </Container>
    </>
  );
};

export default CardFunnelStageMenu;
