import React, { useCallback, useMemo, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import ITaskDTO from '../../../dtos/ITaskDTO';
import { Container, SettingsButton, ButtonContainer } from './styles';
import { useCheckList } from '../../../hooks/checkList';

import formatHourDateShort from '../../../utils/formatHourDateShort';
import TaskSettings from '../../CardPage/CardBody/CardAditionalInfoSection/CardTaskDashboard/CardCheckListContainer/TaskSettings';
import PriorityButton from './PriorityButton';
import StatusButton from './StatusButton';
import TaskNotesButton from './TaskNotesButton';
import TaskHourButton from './TaskHourButton';
import TaskDateButton from './TaskDateButton';
import TaskNameButton from './TaskNameButton';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

const Task: React.FC<IProps> = ({ task, update }) => {
  const { selectTask, selectedTask, priorityColors } = useCheckList();
  const [settingsWindow, setSettingsWindow] = useState(false);

  const handleCloseWindows = useCallback(() => {
    selectTask({} as ITaskDTO);
    setSettingsWindow(false);
  }, [selectTask]);

  const handleTaskSettings = useCallback(() => {
    selectTask(task);
    setSettingsWindow(true);
  }, [task, selectTask]);

  const backgroundColor = useMemo(() => {
    const color = priorityColors.filter(
      pcolor => pcolor.priority === task.priority,
    )[0];
    return color.color;
  }, [priorityColors, task]);

  return (
    <>
      {settingsWindow && selectedTask && (
        <TaskSettings
          update={update}
          closeWindow={() => handleCloseWindows()}
        />
      )}
      <Container style={{ background: backgroundColor }}>
        <TaskNameButton task={task} update={update} />
        <span>
          <aside>
            <TaskHourButton task={task} update={update} />
            <TaskDateButton task={task} update={update} />
          </aside>
          <div>
            <ButtonContainer>
              <PriorityButton update={update} task={task} />
              <StatusButton task={task} update={update} />
              <TaskNotesButton task={task} />

              <SettingsButton type="button" onClick={handleTaskSettings}>
                <div />
                <div />
                <div />
              </SettingsButton>
            </ButtonContainer>
            <p>
              <FiRefreshCcw size={16} />{' '}
              {formatHourDateShort(String(task.updated_at))}
            </p>
          </div>
        </span>
      </Container>
    </>
  );
};

export default Task;
