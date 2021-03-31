import React, { MouseEventHandler, useCallback, useState } from 'react';
import WindowContainer from '../../../../../WindowContainer';
import { useToast } from '../../../../../../hooks/toast';

import { Container } from './styles';
import api from '../../../../../../services/api';
import IStageCardDTO from '../../../../../../dtos/IStageCardDTO';
import { useEmployeeAuth } from '../../../../../../hooks/employeeAuth';

interface IProps {
  card: IStageCardDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getCardNotes: Function;
}

const CreateNoteForm: React.FC<IProps> = ({
  card,
  getCardNotes,
  onHandleCloseWindow,
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();

  const [note, setNote] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      if (note === '') {
        return addToast({
          type: 'error',
          title: 'Erro ao salvar anotação',
          description: 'Tente novamente.',
        });
      }
      await api.post(`cards/notes`, {
        user_id: employee.user.id,
        card_unique_name: card.unique_name,
        note,
      });

      getCardNotes(card.unique_name);
      handleCloseWindow();
      return addToast({
        type: 'success',
        title: 'Card criado com sucesso',
        description: 'Você já pode visualizá-lo no seu dashboard.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar colaborador',
        description: 'Erro ao adicionar colaborador, tente novamente.',
      });

      throw new Error(err);
    }
  }, [addToast, handleCloseWindow, employee.user, card, getCardNotes, note]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '38%',
        left: '20%',
        height: '24%',
        width: '60%',
      }}
    >
      <Container>
        <input
          placeholder="Sua anotação ..."
          onChange={e => setNote(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          salvar
        </button>
      </Container>
    </WindowContainer>
  );
};

export default CreateNoteForm;
