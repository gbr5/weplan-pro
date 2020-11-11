import React, { MouseEventHandler, useCallback } from 'react';
import ITasks from '../../../../dtos/ITaskDTO';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import WindowContainer from '../../../WindowContainer';

import sleepyTask from '../../../../assets/sleepyTask1.svg';
import runningTask from '../../../../assets/runningTask1.svg';
import doneTask from '../../../../assets/doneTask1.svg';

import { Container, StatusButton } from './styles';

interface IProps {
  task: ITasks;
  getEmployeeTasks: Function;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
}

const TaskStatusContainer: React.FC<IProps> = ({
  task,
  getEmployeeTasks,
  onHandleCloseWindow,
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const updateEmployeeTaskStatus = useCallback(
    async status => {
      try {
        await api.put(`check-lists/tasks/edit/status/${task.id}`, {
          status,
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
        <h2>Status da Tarefa</h2>
        <div>
          <StatusButton
            onClick={() => updateEmployeeTaskStatus('1')}
            type="button"
          >
            Não iniciada
            <img src={sleepyTask} alt="Sleepy Task - We Plan" />
          </StatusButton>
        </div>
        <div>
          <StatusButton
            onClick={() => updateEmployeeTaskStatus('2')}
            type="button"
          >
            Em execução
            <img src={runningTask} alt="Running Task - We Plan" />
          </StatusButton>
        </div>
        <div>
          <StatusButton
            onClick={() => updateEmployeeTaskStatus('3')}
            type="button"
          >
            Finalizada
            <img src={doneTask} alt="Done Task - We Plan" />
          </StatusButton>
        </div>
      </Container>
    </WindowContainer>
  );
};

export default TaskStatusContainer;
