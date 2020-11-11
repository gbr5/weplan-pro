import React, { MouseEventHandler, useCallback } from 'react';
import { MdFlag } from 'react-icons/md';
import ITasks from '../../../../dtos/ITaskDTO';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import WindowContainer from '../../../WindowContainer';

import { Container, PriorityButton } from './styles';

interface IProps {
  task: ITasks;
  getEmployeeTasks: Function;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
}

const TaskPriorityContainer: React.FC<IProps> = ({
  task,
  getEmployeeTasks,
  onHandleCloseWindow,
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const updateEmployeeTaskPriority = useCallback(
    async priority => {
      try {
        await api.put(`check-lists/tasks/edit/priority/${task.id}`, {
          priority,
        });
        getEmployeeTasks();
        handleCloseWindow();
        addToast({
          type: 'success',
          title: 'Tarefa atualizada com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [getEmployeeTasks, addToast, task, handleCloseWindow],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '30%',
        left: '10%',
        width: '80%',
        height: '20%',
      }}
    >
      <Container>
        <h2>Prioridade da tarefa</h2>
        <div>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('low')}
            type="button"
          >
            Baixa
            <MdFlag style={{ color: 'green' }} />
          </PriorityButton>
        </div>
        <div>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('neutral')}
            type="button"
          >
            Moderada
            <MdFlag style={{ color: 'yellow' }} />
          </PriorityButton>
        </div>
        <div>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('high')}
            type="button"
          >
            Alta
            <MdFlag style={{ color: 'red' }} />
          </PriorityButton>
        </div>
      </Container>
    </WindowContainer>
  );
};

export default TaskPriorityContainer;
