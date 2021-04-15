import React, { useCallback, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { useFunnel } from '../../../hooks/funnel';
import { useStageCard } from '../../../hooks/stageCard';
import InlineFormField from '../../GeneralComponents/InlineFormField';
import CardFunnelStageMenu from './CardFunnelStageMenu';

import { Container, CardTitle, StageButton } from './styles';

const CardHeader: React.FC = () => {
  const iconsize = 24;
  const { selectedCard, updateCardName } = useStageCard();
  const { selectedFunnel } = useFunnel();
  const [updateStage, setUpdateStage] = useState(false);
  const [updateCardNameField, setUpdateCardNameField] = useState(false);

  const handleUpdateStage = useCallback((e: boolean) => {
    setUpdateStage(e);
  }, []);

  const handleUpdateCardNameField = useCallback((e: boolean) => {
    setUpdateCardNameField(e);
  }, []);

  const stageName = useMemo(() => {
    const stage =
      selectedFunnel &&
      selectedFunnel.stages &&
      selectedFunnel.stages.filter(
        thisStage => thisStage.id === selectedCard.stage_id,
      );
    if (stage) {
      return stage[0].name;
    }
    return '';
  }, [selectedCard, selectedFunnel]);

  const handleUpdateCardName = useCallback(
    (e: string) => {
      updateCardName({
        ...selectedCard,
        name: e,
      });
    },
    [updateCardName, selectedCard],
  );

  return (
    <Container>
      <CardTitle>
        <span>Nome do Card</span>
        <button
          type="button"
          onClick={() => handleUpdateCardNameField(!updateCardNameField)}
        >
          <MdEdit size={iconsize} />
        </button>
        {updateCardNameField ? (
          // <EditCardTitle closeComponent={() => handleUpdateCardNameField(false)} />
          <h2>
            <InlineFormField
              closeComponent={() => handleUpdateCardNameField(false)}
              defaultValue={selectedCard.name}
              placeholder={selectedCard.name}
              handleOnSubmit={(e: string) => handleUpdateCardName(e)}
            />
          </h2>
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
        <CardFunnelStageMenu closeComponent={() => handleUpdateStage(false)} />
      )}
    </Container>
  );
};

export default CardHeader;
