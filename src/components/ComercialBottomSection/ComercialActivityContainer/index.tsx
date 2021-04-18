import React, { useCallback, useEffect } from 'react';
import ICardNotesDTO from '../../../dtos/ICardNotesDTO';
import { useStageCard } from '../../../hooks/stageCard';
import CardNote from '../../CardPage/CardBody/CardAditionalInfoSection/CardNotesDashboard/CardNote';

import { Notes, Main } from './styles';

const ComercialActivityContainer: React.FC = () => {
  const {
    selectedNote,
    selectNote,
    cardNotes,
    selectedCard,
    getCardNotes,
  } = useStageCard();

  const handleSetSelectedNote = useCallback(
    (props: ICardNotesDTO) => {
      selectNote(props);
    },
    [selectNote],
  );

  useEffect(() => {
    getCardNotes();
  }, [getCardNotes]);
  return (
    <Main>
      <h2>Últimas atividades</h2>
      <Notes>
        {selectedCard &&
          selectedCard.id &&
          cardNotes.length > 0 &&
          cardNotes.map(xCard => (
            <CardNote
              key={xCard.id}
              handleSetSelectedNote={handleSetSelectedNote}
              cardNote={xCard}
              isSelected={xCard.id === selectedNote.id}
            />
          ))}
      </Notes>
    </Main>
  );
};

export default ComercialActivityContainer;
