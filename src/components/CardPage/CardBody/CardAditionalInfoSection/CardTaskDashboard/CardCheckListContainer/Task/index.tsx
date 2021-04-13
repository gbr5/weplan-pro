import React, { useCallback, useEffect, useState } from 'react';
import { MdFlag } from 'react-icons/md';
import ITaskDTO from '../../../../../../../dtos/ITaskDTO';
import sleepyTask from '../../../../../../../assets/sleepyTask1.svg';
import runningTask from '../../../../../../../assets/runningTask1.svg';
import doneTask from '../../../../../../../assets/doneTask1.svg';
import { Container, ButtonContainer, Priority, Status } from './styles';
import { useCheckList } from '../../../../../../../hooks/checkList';

import TaskStatusContainer from '../../TaskStatusContainer';
import TaskPriorityContainer from '../../TaskPriorityContainer';
import formatHourDateShort from '../../../../../../../utils/formatHourDateShort';

interface IProps {
  backgroundColor: string;
  task: ITaskDTO;
}

const Task: React.FC<IProps> = ({ task, backgroundColor }) => {
  const iconsize = 40;
  const { selectTask, selectedTask } = useCheckList();
  const [statusIcon, setStatusIcon] = useState(sleepyTask);
  const [priorityWindow, setPriorityWindow] = useState(false);
  const [statusWindow, setStatusWindow] = useState(false);

  const handleCloseWindows = useCallback(() => {
    selectTask({} as ITaskDTO);
    setPriorityWindow(false);
    setStatusWindow(false);
  }, [selectTask]);

  const handlePriorityWindow = useCallback(() => {
    selectTask(task);
    setPriorityWindow(true);
  }, [selectTask, task]);

  const handleStatusWindow = useCallback(() => {
    selectTask(task);
    setStatusWindow(true);
  }, [selectTask, task]);

  useEffect(() => {
    if (task.status === '1') {
      setStatusIcon(sleepyTask);
    }
    if (task.status === '2') {
      setStatusIcon(runningTask);
    }
    if (task.status === '3') {
      setStatusIcon(doneTask);
    }
  }, [task]);

  return (
    <>
      {priorityWindow && selectedTask && (
        <TaskPriorityContainer closeWindow={() => handleCloseWindows()} />
      )}
      {statusWindow && selectedTask && (
        <TaskStatusContainer closeWindow={() => handleCloseWindows()} />
      )}
      <Container style={{ background: backgroundColor }}>
        <div>
          <h2>{task.task}</h2>
          <ButtonContainer>
            <Priority type="button" onClick={() => handlePriorityWindow()}>
              {task.priority === 'low' && (
                <MdFlag size={iconsize} style={{ color: 'green' }} />
              )}
              {task.priority === 'neutral' && (
                <MdFlag size={iconsize} style={{ color: 'yellow' }} />
              )}
              {task.priority === 'high' && (
                <MdFlag size={iconsize} style={{ color: 'red' }} />
              )}
            </Priority>
            <Status type="button" onClick={() => handleStatusWindow()}>
              <img src={statusIcon} alt="Task Status Icon - We Plan" />
            </Status>
          </ButtonContainer>
        </div>
        <span>
          <p>Data de entrega: {formatHourDateShort(String(task.due_date))}</p>
          {task.created_at === task.updated_at ? (
            <p>Criado: {formatHourDateShort(String(task.created_at))}</p>
          ) : (
            <p>Atualizado: {formatHourDateShort(String(task.updated_at))}</p>
          )}
        </span>
      </Container>
    </>
  );
};

export default Task;
