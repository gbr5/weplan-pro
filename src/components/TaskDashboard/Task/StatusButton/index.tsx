import React, { useCallback, useState } from 'react';
import ITaskDTO from '../../../../dtos/ITaskDTO';
import sleepyTask from '../../../../assets/sleepyTask1.svg';
import runningTask from '../../../../assets/runningTask1.svg';
import doneTask from '../../../../assets/doneTask1.svg';
import { Container, SelectStatusContainer } from './styles';
import TaskStatusContainer from '../../TaskStatusContainer';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

const StatusButton: React.FC<IProps> = ({ task, update }) => {
  const [statusWindow, setStatusWindow] = useState(false);

  const handleStatusWindow = useCallback((e: boolean) => {
    setStatusWindow(e);
  }, []);

  return (
    <Container>
      {statusWindow && (
        <SelectStatusContainer>
          <TaskStatusContainer
            task={task}
            closeWindow={() => handleStatusWindow(false)}
            update={update}
          />
          <span />
        </SelectStatusContainer>
      )}
      <button type="button" onClick={() => handleStatusWindow(!statusWindow)}>
        {task.status === '1' && (
          <img src={sleepyTask} alt="Task Status Icon - We Plan" />
        )}
        {task.status === '2' && (
          <img src={runningTask} alt="Task Status Icon - We Plan" />
        )}
        {task.status === '3' && (
          <img src={doneTask} alt="Task Status Icon - We Plan" />
        )}
      </button>
    </Container>
  );
};

export default StatusButton;
