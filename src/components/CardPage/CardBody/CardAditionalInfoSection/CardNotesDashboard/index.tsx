import React, { useCallback, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { Main, ContainerMenu, Notes } from './styles';
import NotesContainer from './NotesContainer';
import ICardNotesDTO from '../../../../../dtos/ICardNotesDTO';
import CreateNoteForm from './CreateNoteForm';
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
      <ContainerMenu>
        <button type="button">
          <p>Selecionar autor</p>
          <strong>
            pessoasCard
            <FiChevronDown size={24} />
          </strong>
        </button>
      </ContainerMenu>
      <CreateNoteForm />
      <Notes>
        {cardNotes.length > 0 &&
          cardNotes.map(xCard => (
            <NotesContainer
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
