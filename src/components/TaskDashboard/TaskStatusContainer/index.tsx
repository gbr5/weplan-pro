import React, { useCallback } from 'react';

import sleepyTask from '../../../assets/sleepyTask1.svg';
import runningTask from '../../../assets/runningTask1.svg';
import doneTask from '../../../assets/doneTask1.svg';

import { Container, StatusButton } from './styles';
import { useCheckList } from '../../../hooks/checkList';
import ITaskDTO from '../../../dtos/ITaskDTO';

interface IProps {
  closeWindow: Function;
  update: Function;
  task: ITaskDTO;
}

const TaskStatusContainer: React.FC<IProps> = ({
  closeWindow,
  update,
  task,
}: IProps) => {
  const { updateTask } = useCheckList();

  const updateEmployeeTaskStatus = useCallback(
    async status => {
      await updateTask({
        ...task,
        status,
      });
      update();
      closeWindow();
    },
    [task, update, updateTask, closeWindow],
  );

  return (
    <Container>
      <p>Status da Tarefa</p>
      <span>
        <StatusButton
          onClick={() => updateEmployeeTaskStatus('1')}
          type="button"
        >
          <img src={sleepyTask} alt="Sleepy Task - We Plan" />
        </StatusButton>
        <StatusButton
          onClick={() => updateEmployeeTaskStatus('2')}
          type="button"
        >
          <img src={runningTask} alt="Running Task - We Plan" />
        </StatusButton>
        <StatusButton
          onClick={() => updateEmployeeTaskStatus('3')}
          type="button"
        >
          <img src={doneTask} alt="Done Task - We Plan" />
        </StatusButton>
      </span>
    </Container>
  );
};

export default TaskStatusContainer;
