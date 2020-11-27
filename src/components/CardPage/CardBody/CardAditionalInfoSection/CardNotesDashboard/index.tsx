import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';
import api from '../../../../../services/api';

import { Main, ContainerMenu } from './styles';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import NotesContainer from './NotesContainer';
import ICardNotesDTO from '../../../../../dtos/ICardNotesDTO';
import CreateNoteForm from './CreateNoteForm';

interface IProps {
  card: IStageCardDTO;
}

const CardNotesDashboard: React.FC<IProps> = ({ card }: IProps) => {
  const [createCardNoteWindow, setCreateCardNoteWindow] = useState(false);
  const [selectedNote, setSelectedNote] = useState<ICardNotesDTO>(
    {} as ICardNotesDTO,
  );
  const [cardNotes, setCardNotes] = useState<ICardNotesDTO[]>([]);

  const handleCreateCardNoteWindow = useCallback(() => {
    setCreateCardNoteWindow(true);
  }, []);
  const handleCloseCreateCardNoteWindow = useCallback(() => {
    setCreateCardNoteWindow(false);
  }, []);

  const getCardNotes = useCallback(props => {
    try {
      api.get<ICardNotesDTO[]>(`cards/notes/${props}`).then(response => {
        setCardNotes(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const handleSetSelectedNote = useCallback((props: ICardNotesDTO) => {
    setSelectedNote(props);
  }, []);

  useEffect(() => {
    getCardNotes(card.unique_name);
  }, [getCardNotes, card]);

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
          card={card}
          getCardNotes={getCardNotes}
        />
      )}
    </Main>
  );
};

export default CardNotesDashboard;
