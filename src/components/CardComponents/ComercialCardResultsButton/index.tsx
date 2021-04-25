import React, { useCallback, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useStageCard } from '../../../hooks/stageCard';
import CreateComercialCardResults from '../CreateComercialCardResults';
import EditComercialCardResultWindow from '../EditComercialCardResultWindow';

import { Container, LostButton, SuccessButton, FinishButton } from './styles';

const ComercialCardResultsButton: React.FC = () => {
  const { selectedCard } = useStageCard();
  const [createCardResultWindow, setCreateCardResultWindow] = useState(false);
  const [editCardResultWindow, setEditCardResultWindow] = useState(false);
  const [startSection, setStartSection] = useState(1);

  const handleCloseAllWindows = useCallback(() => {
    setCreateCardResultWindow(false);
    setEditCardResultWindow(false);
  }, []);

  const handleEditCardResultWindow = useCallback(
    e => {
      handleCloseAllWindows();
      setEditCardResultWindow(e);
    },
    [handleCloseAllWindows],
  );
  const handleCreateCardResultWindow = useCallback(
    (e: number) => {
      setStartSection(e);
      handleCloseAllWindows();
      setCreateCardResultWindow(true);
    },
    [handleCloseAllWindows],
  );

  return (
    <>
      {createCardResultWindow && (
        <CreateComercialCardResults
          startSection={startSection}
          closeWindow={() => handleCloseAllWindows()}
        />
      )}
      <Container>
        {editCardResultWindow && (
          <EditComercialCardResultWindow
            closeWindow={handleCloseAllWindows}
            createNewCardResultWindow={(e: number) =>
              handleCreateCardResultWindow(e)
            }
          />
        )}
        {selectedCard &&
          selectedCard.result &&
          (selectedCard.result.isSuccessful ? (
            <SuccessButton
              type="button"
              onClick={() => handleEditCardResultWindow(!editCardResultWindow)}
            >
              <strong>Fechado</strong>
            </SuccessButton>
          ) : (
            <LostButton
              type="button"
              onClick={() => handleEditCardResultWindow(!editCardResultWindow)}
            >
              <p>Perdido</p>
            </LostButton>
          ))}
        {selectedCard && !selectedCard.result && (
          <FinishButton
            type="button"
            onClick={() => handleCreateCardResultWindow(1)}
          >
            <strong>Finalizar</strong> <FiChevronRight size={55} />
          </FinishButton>
        )}
      </Container>
    </>
  );
};

export default ComercialCardResultsButton;
