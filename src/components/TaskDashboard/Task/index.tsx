import React, { useMemo } from 'react';
import { FiAlertCircle, FiRefreshCcw } from 'react-icons/fi';
import { differenceInDays } from 'date-fns/esm';
import ITaskDTO from '../../../dtos/ITaskDTO';
import { useCheckList } from '../../../hooks/checkList';

import formatHourDateShort from '../../../utils/formatHourDateShort';
import PriorityButton from './PriorityButton';
import StatusButton from './StatusButton';
import TaskNotesButton from './TaskNotesButton';
import TaskHourButton from './TaskHourButton';
import TaskDateButton from './TaskDateButton';
import TaskNameButton from './TaskNameButton';
import TaskDeleteButton from './TaskDeleteButton';

import { Container, ButtonContainer, LateTask } from './styles';

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

  const daysLate = useMemo(() => {
    const now = new Date();
    const taskDueDate = new Date(task.due_date);
    if (taskDueDate !== undefined)
      return differenceInDays(now, taskDueDate) > 0
        ? differenceInDays(now, taskDueDate)
        : false;
    return false;
  }, [task]);

  return (
    <>
      <Container style={{ background: backgroundColor }}>
        {daysLate && (
          <LateTask>
            <FiAlertCircle size={24} />
            <strong>
              Tarefa atrasada há <p>{daysLate}</p> dias!
            </strong>
          </LateTask>
        )}
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
              <TaskDeleteButton task={task} update={update} />
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
