import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';

import { Main, ContainerMenu } from './styles';
import NotesContainer from './NotesContainer';
import ICardNotesDTO from '../../../../../dtos/ICardNotesDTO';
import CreateNoteForm from './CreateNoteForm';
import { useStageCard } from '../../../../../hooks/stageCard';

const CardNotesDashboard: React.FC = () => {
  const {
    selectedCard,
    selectedNote,
    getCardNotes,
    selectNote,
    cardNotes,
  } = useStageCard();
  const [createCardNoteWindow, setCreateCardNoteWindow] = useState(false);

  const handleCreateCardNoteWindow = useCallback(() => {
    setCreateCardNoteWindow(true);
  }, []);
  const handleCloseCreateCardNoteWindow = useCallback(() => {
    setCreateCardNoteWindow(false);
  }, []);

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
        <button type="button" onClick={handleCreateCardNoteWindow}>
          <p>Adicionar nota</p>
          <strong>
            <MdAdd size={30} />
          </strong>
        </button>
      </ContainerMenu>
      {cardNotes.length > 0 &&
        cardNotes.map(xCard => (
          <NotesContainer
            handleSetSelectedNote={handleSetSelectedNote}
            cardNote={xCard}
            isSelected={xCard.id === selectedNote.id}
          />
        ))}
      {createCardNoteWindow && (
        <CreateNoteForm
          handleCloseWindow={handleCloseCreateCardNoteWindow}
          onHandleCloseWindow={() => setCreateCardNoteWindow(false)}
          card={selectedCard}
          getCardNotes={getCardNotes}
        />
      )}
    </Main>
  );
};

export default CardNotesDashboard;
