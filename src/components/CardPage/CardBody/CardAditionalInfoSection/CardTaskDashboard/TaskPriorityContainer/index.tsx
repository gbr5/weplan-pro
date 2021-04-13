import React, { useCallback } from 'react';
import { MdFlag } from 'react-icons/md';
import { useCheckList } from '../../../../../../hooks/checkList';
import { useStageCard } from '../../../../../../hooks/stageCard';
import { useToast } from '../../../../../../hooks/toast';
import api from '../../../../../../services/api';
import WindowContainer from '../../../../../WindowContainer';

import { Container, PriorityButton } from './styles';

interface IProps {
  closeWindow: Function;
}

const TaskPriorityContainer: React.FC<IProps> = ({ closeWindow }: IProps) => {
  const iconsize = 32;
  const { addToast } = useToast();
  const { selectedTask } = useCheckList();
  const { getCardCheckLists } = useStageCard();

  const updateEmployeeTaskPriority = useCallback(
    async priority => {
      try {
        await api.put(`check-lists/tasks/edit/priority/${selectedTask.id}`, {
          priority,
        });
        getCardCheckLists();
        closeWindow();
        addToast({
          type: 'success',
          title: 'Tarefa atualizada com sucesso',
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [getCardCheckLists, addToast, selectedTask, closeWindow],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '25%',
        left: '5%',
        width: '90%',
        height: '50%',
      }}
    >
      <Container>
        <h2>Prioridade da tarefa</h2>
        <span>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('low')}
            type="button"
          >
            Baixa
            <MdFlag size={iconsize} style={{ color: 'green' }} />
          </PriorityButton>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('neutral')}
            type="button"
          >
            Moderada
            <MdFlag size={iconsize} style={{ color: 'yellow' }} />
          </PriorityButton>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('high')}
            type="button"
          >
            Alta
            <MdFlag size={iconsize} style={{ color: 'red' }} />
          </PriorityButton>
        </span>
      </Container>
    </WindowContainer>
  );
};

export default TaskPriorityContainer;
