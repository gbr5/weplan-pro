import React, { useCallback } from 'react';
import WindowContainer from '../../WindowContainer';

import sleepyTask from '../../../assets/sleepyTask1.svg';
import runningTask from '../../../assets/runningTask1.svg';
import doneTask from '../../../assets/doneTask1.svg';

import { Container, StatusButton } from './styles';
import { useCheckList } from '../../../hooks/checkList';

interface IProps {
  closeWindow: Function;
  update: Function;
}

const TaskStatusContainer: React.FC<IProps> = ({
  closeWindow,
  update,
}: IProps) => {
  const { selectedTask, updateTask } = useCheckList();

  const updateEmployeeTaskStatus = useCallback(
    async status => {
      await updateTask({
        ...selectedTask,
        status,
      });
      update();
      closeWindow();
    },
    [selectedTask, update, updateTask, closeWindow],
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
        <h2>Status da Tarefa</h2>
        <span>
          <StatusButton
            onClick={() => updateEmployeeTaskStatus('1')}
            type="button"
          >
            Não iniciada
            <img src={sleepyTask} alt="Sleepy Task - We Plan" />
          </StatusButton>
          <StatusButton
            onClick={() => updateEmployeeTaskStatus('2')}
            type="button"
          >
            Em execução
            <img src={runningTask} alt="Running Task - We Plan" />
          </StatusButton>
          <StatusButton
            onClick={() => updateEmployeeTaskStatus('3')}
            type="button"
          >
            Finalizada
            <img src={doneTask} alt="Done Task - We Plan" />
          </StatusButton>
        </span>
      </Container>
    </WindowContainer>
  );
};

export default TaskStatusContainer;
