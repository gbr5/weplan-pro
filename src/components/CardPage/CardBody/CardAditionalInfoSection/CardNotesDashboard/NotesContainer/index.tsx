import React, { useCallback, useEffect, useState } from 'react';

import { Container, Note } from './styles';

import ICardNotesDTO from '../../../../../../dtos/ICardNotesDTO';
import IUserDTO from '../../../../../../dtos/IUserDTO';
import { useEmployeeAuth } from '../../../../../../hooks/employeeAuth';
import formatHourDateShort from '../../../../../../utils/formatHourDateShort';
import { useSignUp } from '../../../../../../hooks/signUp';

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
  const { getUserProfile } = useSignUp();

  const [author, setAuthor] = useState<IUserDTO>({} as IUserDTO);

  const getAuthor = useCallback(async () => {
    try {
      const userAuthor = await getUserProfile(cardNote.user_id);
      userAuthor && setAuthor(userAuthor);
    } catch (err) {
      throw new Error(err);
    }
  }, [cardNote, getUserProfile]);

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
