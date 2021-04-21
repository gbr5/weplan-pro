import React, { useMemo } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import ITaskDTO from '../../../dtos/ITaskDTO';
import { Container, ButtonContainer } from './styles';
import { useCheckList } from '../../../hooks/checkList';

import formatHourDateShort from '../../../utils/formatHourDateShort';
import PriorityButton from './PriorityButton';
import StatusButton from './StatusButton';
import TaskNotesButton from './TaskNotesButton';
import TaskHourButton from './TaskHourButton';
import TaskDateButton from './TaskDateButton';
import TaskNameButton from './TaskNameButton';
import TaskDeleteButton from './TaskDeleteButton';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

const Task: React.FC<IProps> = ({ task, update }) => {
  const { priorityColors } = useCheckList();

  const backgroundColor = useMemo(() => {
    const color = priorityColors.filter(
      pcolor => pcolor.priority === task.priority,
    )[0];
    return color.color;
  }, [priorityColors, task]);

  return (
    <>
      <Container style={{ background: backgroundColor }}>
        <TaskNameButton task={task} update={update} />
        <span>
          <aside>
            <TaskDateButton task={task} update={update} />
            <TaskHourButton task={task} update={update} />
          </aside>
          <div>
            <ButtonContainer>
              <TaskNotesButton task={task} />
              <PriorityButton update={update} task={task} />
              <StatusButton task={task} update={update} />
              <TaskDeleteButton update={update} />
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
