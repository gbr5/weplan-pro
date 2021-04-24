import React, { useCallback, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useStageCard } from '../../../hooks/stageCard';
import CreateComercialCardResults from '../CreateComercialCardResults';

import { Container, LostButton, SuccessButton, FinishButton } from './styles';

const ComercialCardResultsButton: React.FC = () => {
  const { selectedCard } = useStageCard();
  const [createCardResultWindow, setCreateCardResultWindow] = useState(false);

  const handleCreateCardResultWindow = useCallback((e: boolean) => {
    setCreateCardResultWindow(e);
  }, []);

  return (
    <>
      {createCardResultWindow && (
        <CreateComercialCardResults
          closeWindow={() => handleCreateCardResultWindow(false)}
        />
      )}
      <Container>
        {selectedCard &&
          selectedCard.result &&
          (selectedCard.result.isSuccessful ? (
            <SuccessButton type="button">
              <strong>Fechado</strong>
            </SuccessButton>
          ) : (
            <LostButton type="button">
              <p>Perdido</p>
            </LostButton>
          ))}
        {selectedCard && !selectedCard.result && (
          <FinishButton
            type="button"
            onClick={() => handleCreateCardResultWindow(true)}
          >
            Finalizar <FiChevronRight size={55} />
          </FinishButton>
        )}
      </Container>
    </>
  );
};

export default ComercialCardResultsButton;
