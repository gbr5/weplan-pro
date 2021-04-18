import React, { useCallback, useEffect } from 'react';

import { Main, Notes } from './styles';
import CardNote from './CardNote';
import ICardNotesDTO from '../../../../../dtos/ICardNotesDTO';
import CreateCardNoteForm from './CreateCardNoteForm';
import { useStageCard } from '../../../../../hooks/stageCard';

const CardNotesDashboard: React.FC = () => {
  const { selectedNote, selectNote, cardNotes, getCardNotes } = useStageCard();

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
      <CreateCardNoteForm />
      <Notes>
        {cardNotes.length > 0 &&
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

export default CardNotesDashboard;
