import React, { useCallback, useEffect, useState } from 'react';
import { MdFlag, MdSchedule } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';
import ITaskDTO from '../../../dtos/ITaskDTO';
import sleepyTask from '../../../assets/sleepyTask1.svg';
import runningTask from '../../../assets/runningTask1.svg';
import doneTask from '../../../assets/doneTask1.svg';
import {
  Container,
  SettingsButton,
  ButtonContainer,
  Priority,
  Status,
} from './styles';
import { useCheckList } from '../../../hooks/checkList';

import TaskStatusContainer from '../TaskStatusContainer';
import TaskPriorityContainer from '../TaskPriorityContainer';
import formatHourDateShort from '../../../utils/formatHourDateShort';
import TaskSettings from '../../CardPage/CardBody/CardAditionalInfoSection/CardTaskDashboard/CardCheckListContainer/TaskSettings';

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
  const [settingsWindow, setSettingsWindow] = useState(false);

  const handleCloseWindows = useCallback(() => {
    selectTask({} as ITaskDTO);
    setPriorityWindow(false);
    setStatusWindow(false);
    setSettingsWindow(false);
  }, [selectTask]);

  const handlePriorityWindow = useCallback(() => {
    selectTask(task);
    setPriorityWindow(true);
  }, [selectTask, task]);

  const handleStatusWindow = useCallback(() => {
    selectTask(task);
    setStatusWindow(true);
  }, [selectTask, task]);

  const handleTaskSettings = useCallback(() => {
    selectTask(task);
    setSettingsWindow(true);
  }, [task, selectTask]);

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
      {settingsWindow && selectedTask && (
        <TaskSettings closeWindow={() => handleCloseWindows()} />
      )}
      {priorityWindow && selectedTask && (
        <TaskPriorityContainer closeWindow={() => handleCloseWindows()} />
      )}
      {statusWindow && selectedTask && (
        <TaskStatusContainer closeWindow={() => handleCloseWindows()} />
      )}
      <Container style={{ background: backgroundColor }}>
        <h3>{task.task}</h3>
        <div>
          <span>
            <p>
              <MdSchedule size={20} />{' '}
              {formatHourDateShort(String(task.due_date))}
            </p>
            {task.created_at === task.updated_at ? (
              <p>
                <FiRefreshCcw size={20} />{' '}
                {formatHourDateShort(String(task.created_at))}
              </p>
            ) : (
              <p>
                <FiRefreshCcw size={20} />{' '}
                {formatHourDateShort(String(task.updated_at))}
              </p>
            )}
          </span>

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
            <SettingsButton type="button" onClick={handleTaskSettings}>
              <div />
              <div />
              <div />
            </SettingsButton>
          </ButtonContainer>
        </div>
      </Container>
    </>
  );
};

export default Task;
