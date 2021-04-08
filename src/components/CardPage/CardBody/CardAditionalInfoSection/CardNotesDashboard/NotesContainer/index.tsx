import React, { useCallback, useEffect, useState } from 'react';

import { Container, Note } from './styles';

import ICardNotesDTO from '../../../../../../dtos/ICardNotesDTO';
import api from '../../../../../../services/api';
import IUserDTO from '../../../../../../dtos/IUserDTO';
import { useEmployeeAuth } from '../../../../../../hooks/employeeAuth';
import formatHourDateShort from '../../../../../../utils/formatHourDateShort';

interface IProps {
  cardNote: ICardNotesDTO;
  isSelected: boolean;
  handleSetSelectedNote: Function;
}

const NotesContainer: React.FC<IProps> = ({
  cardNote,
  isSelected,
  handleSetSelectedNote,
}: IProps) => {
  const { employee } = useEmployeeAuth();

  const [author, setAuthor] = useState<IUserDTO>({} as IUserDTO);

  const getAuthor = useCallback(async () => {
    try {
      const userAuthor = await api.get(`/profile/external/${cardNote.user_id}`);
      setAuthor(userAuthor.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [cardNote]);

  useEffect(() => {
    if (cardNote.user_id === employee.employeeUser.id) {
      getAuthor();
    }
  }, [getAuthor, cardNote, employee]);

  let phraseIndex = 0;

  return (
    <Container
      onClick={() => handleSetSelectedNote(cardNote)}
      isActive={isSelected}
    >
      <Note>
        {cardNote.note.split('\n').map(phrase => {
          phraseIndex += 1;
          return <p key={phraseIndex}>{phrase}</p>;
        })}
      </Note>

      <footer>
        <strong>{formatHourDateShort(String(cardNote.created_at))}</strong>
        {cardNote.user_id !== employee.employeeUser.id ? (
          <strong>{author}</strong>
        ) : (
          <strong>Você enviou</strong>
        )}
        {cardNote.created_at !== cardNote.updated_at && (
          <strong>
            Atualizado: {formatHourDateShort(String(cardNote.updated_at))}
          </strong>
        )}
      </footer>
    </Container>
  );
};

export default NotesContainer;
