import React, { useCallback, useMemo, useState } from 'react';
import { FiFileText, FiRefreshCcw } from 'react-icons/fi';
import { MdSchedule } from 'react-icons/md';
import ITaskDTO from '../../../dtos/ITaskDTO';
import {
  Container,
  SettingsButton,
  ButtonContainer,
  DeleteButton,
} from './styles';
import { useCheckList } from '../../../hooks/checkList';

import formatHourDateShort from '../../../utils/formatHourDateShort';
import TaskSettings from '../../CardPage/CardBody/CardAditionalInfoSection/CardTaskDashboard/CardCheckListContainer/TaskSettings';
import PriorityButton from './PriorityButton';
import StatusButton from './StatusButton';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

const Task: React.FC<IProps> = ({ task, update }) => {
  const iconsize = 40;
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
        <h3>{task.task}</h3>
        <div>
          <ButtonContainer>
            {/* <DeleteButton type="button" onClick={handleTaskSettings}>
              <FiTrash2 color="red" size={iconsize} />
            </DeleteButton> */}
            <PriorityButton update={update} task={task} />
            <StatusButton task={task} update={update} />
            <DeleteButton type="button" onClick={handleTaskSettings}>
              <FiFileText color="rgba(100, 222, 255)" size={iconsize} />
            </DeleteButton>

            <SettingsButton type="button" onClick={handleTaskSettings}>
              <div />
              <div />
              <div />
            </SettingsButton>
          </ButtonContainer>
          <span>
            <p>
              <MdSchedule size={16} />{' '}
              {formatHourDateShort(String(task.due_date))}
            </p>
            {task.created_at === task.updated_at ? (
              <p>
                <FiRefreshCcw size={16} />{' '}
                {formatHourDateShort(String(task.created_at))}
              </p>
            ) : (
              <p>
                <FiRefreshCcw size={16} />{' '}
                {formatHourDateShort(String(task.updated_at))}
              </p>
            )}
          </span>
        </div>
      </Container>
    </>
  );
};

export default Task;
