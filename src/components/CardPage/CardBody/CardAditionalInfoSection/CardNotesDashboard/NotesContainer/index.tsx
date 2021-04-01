import React, { useCallback, useState } from 'react';

import { Container } from './styles';

import ICardNotesDTO from '../../../../../../dtos/ICardNotesDTO';
import api from '../../../../../../services/api';
import IUserDTO from '../../../../../../dtos/IUserDTO';
import { useEmployeeAuth } from '../../../../../../hooks/employeeAuth';

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
      const userAuthor = await api.get(`users/${cardNote.user_id}`);
      setAuthor(userAuthor.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [cardNote]);

  if (cardNote.user_id !== employee.employeeUser.id) {
    getAuthor();
  }

  return (
    <Container
      onClick={() => handleSetSelectedNote(cardNote)}
      isActive={isSelected}
    >
      <p>{cardNote.note}</p>
      <div>
        <strong>{cardNote.created_at}</strong>
        {cardNote.user_id !== employee.employeeUser.id && (
          <strong>{author}</strong>
        )}
        {cardNote.created_at !== cardNote.updated_at && (
          <strong>Atualizado{cardNote.updated_at}</strong>
        )}
      </div>
    </Container>
  );
};

export default NotesContainer;
