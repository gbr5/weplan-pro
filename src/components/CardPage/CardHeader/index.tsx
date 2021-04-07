import React, { useCallback, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { useFunnel } from '../../../hooks/funnel';
import { useStageCard } from '../../../hooks/stageCard';
import Button from '../../Button';
import CardFunnelStageMenu from './CardFunnelStageMenu';
import EditCardTitle from './EditCardTitle';

import { Container, CardTitle, StageButton } from './styles';

const CardHeader: React.FC = () => {
  const iconsize = 24;
  const { selectedCard } = useStageCard();
  const { selectedFunnel } = useFunnel();
  const [updateStage, setUpdateStage] = useState(false);
  const [updateCardName, setUpdateCardName] = useState(false);

  const handleUpdateStage = useCallback((e: boolean) => {
    setUpdateStage(e);
  }, []);

  const handleUpdateCardName = useCallback((e: boolean) => {
    setUpdateCardName(e);
  }, []);

  const stageName = useMemo(() => {
    const stage = selectedFunnel.stages.filter(
      thisStage => thisStage.id === selectedCard.stage_id,
    );
    return stage[0].name;
  }, [selectedCard, selectedFunnel]);

  return (
    <Container>
      <CardTitle>
        <span>Nome do Card</span>
        <button
          type="button"
          onClick={() => handleUpdateCardName(!updateCardName)}
        >
          <MdEdit size={iconsize} />
        </button>
        {updateCardName ? (
          <EditCardTitle closeComponent={() => handleUpdateCardName(false)} />
        ) : (
          <h2>{selectedCard.name}</h2>
        )}
      </CardTitle>
      {!updateStage ? (
        <StageButton type="button" onClick={() => handleUpdateStage(true)}>
          <FiChevronLeft size={iconsize} />
          <h3>{stageName}</h3>
          <FiChevronRight size={iconsize} />
        </StageButton>
      ) : (
        <>
          <CardFunnelStageMenu />
          <Button
            style={{ background: 'red', color: 'black' }}
            type="button"
            onClick={() => handleUpdateStage(false)}
          >
            Fechar
          </Button>
        </>
      )}
    </Container>
  );
};

export default CardHeader;
