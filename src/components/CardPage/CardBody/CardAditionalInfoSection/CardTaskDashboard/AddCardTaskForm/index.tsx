import React, { MouseEventHandler, useCallback, useState } from 'react';
import WindowContainer from '../../../../../WindowContainer';
import { useToast } from '../../../../../../hooks/toast';

import { Container } from './styles';
import api from '../../../../../../services/api';
import ICardCheckListDTO from '../../../../../../dtos/ICardCheckListDTO';
import { useEmployeeAuth } from '../../../../../../hooks/employeeAuth';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getCardCheckLists: Function;
  cardCheckList: ICardCheckListDTO;
}

const AddCardTaskForm: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getCardCheckLists,
  cardCheckList,
}: IProps) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();

  const [taskName, setTaskName] = useState('');

  const now = new Date();
  const day = now.getDate() + 3;
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const handleSubmit = useCallback(async () => {
    try {
      if (taskName === '') {
        return addToast({
          type: 'error',
          title: 'Erro ao adicionar CARD',
          description: 'O nome do CARD deve ser preenchido, tente novamente.',
        });
      }
      await api.post(`check-lists/tasks/${cardCheckList.check_list.id}`, {
        owner_id: employee.employeeUser.id,
        task: taskName,
        color: 'rgb(179, 182, 178)',
        isActive: true,
        priority: 'neutral',
        status: '1',
        due_date: `${day}/${month}/${year}`,
      });
      getCardCheckLists();
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
  }, [
    addToast,
    getCardCheckLists,
    taskName,
    handleCloseWindow,
    cardCheckList,
    day,
    month,
    year,
    employee,
  ]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 10,
        top: '38%',
        left: '20%',
        height: '24%',
        width: '60%',
      }}
    >
      {/* <Form> */}
      <Container>
        <input
          placeholder="Nome da tarefa"
          onChange={e => setTaskName(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Criar card
        </button>
      </Container>
      {/* </Form> */}
    </WindowContainer>
  );
};

export default AddCardTaskForm;
