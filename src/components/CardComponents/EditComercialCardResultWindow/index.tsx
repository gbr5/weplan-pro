import React, { useCallback } from 'react';
import { useStageCard } from '../../../hooks/stageCard';

import { Container } from './styles';

interface IProps {
  createNewCardResultWindow: (stage: number) => void;
  closeWindow: () => void;
}

const EditComercialCardResultWindow: React.FC<IProps> = ({
  createNewCardResultWindow,
  closeWindow,
}) => {
  const { deleteComercialCardResults, selectedCard } = useStageCard();

  const handleCreateNewCardResultWindow = useCallback(() => {
    deleteComercialCardResults(selectedCard.result.id);
    selectedCard.result.isSuccessful && createNewCardResultWindow(3);
    !selectedCard.result.isSuccessful && createNewCardResultWindow(2);
  }, [deleteComercialCardResults, createNewCardResultWindow, selectedCard]);

  const handleReOpenCard = useCallback(() => {
    deleteComercialCardResults(selectedCard.result.id);
    closeWindow();
  }, [deleteComercialCardResults, closeWindow, selectedCard]);

  return (
    <Container>
      <button type="button" onClick={handleReOpenCard}>
        Reabrir Negócio
      </button>
      <button type="button" onClick={handleCreateNewCardResultWindow}>
        Editar Resultado
      </button>
    </Container>
  );
};

export default EditComercialCardResultWindow;
