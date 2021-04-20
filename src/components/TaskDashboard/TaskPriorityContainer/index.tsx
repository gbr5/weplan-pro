import React, { useCallback } from 'react';
import { MdFlag } from 'react-icons/md';
import ITaskDTO from '../../../dtos/ITaskDTO';
import { useCheckList } from '../../../hooks/checkList';

import { Container, PriorityButton } from './styles';

interface IProps {
  closeWindow: Function;
  update: Function;
  task: ITaskDTO;
}

const TaskPriorityContainer: React.FC<IProps> = ({
  closeWindow,
  update,
  task,
}: IProps) => {
  const { createTaskNote } = useCheckList();
  const iconsize = 32;
  const { updateTask } = useCheckList();

  const updateEmployeeTaskPriority = useCallback(
    async priority => {
      let oldPriority = 'Baixa';
      if (task.priority === 'neutral') oldPriority = 'Neutra';
      if (task.priority === 'high') oldPriority = 'Alta';
      let newPriority = 'Baixa';
      if (priority === 'neutral') newPriority = 'Neutra';
      if (priority === 'high') newPriority = 'Alta';
      await updateTask({
        ...task,
        priority,
      });

      createTaskNote({
        note: `Tarefa Editada|||\n\nAntiga Prioridade: ${oldPriority}\n.\nNova Prioridade: ${newPriority}\n. . . . .`,
        task_id: task.id,
      });
      update();
      closeWindow();
    },
    [update, task, updateTask, closeWindow, createTaskNote],
  );

  return (
    <Container>
      <p>Prioridade da tarefa</p>
      <span>
        <PriorityButton
          onClick={() => updateEmployeeTaskPriority('low')}
          type="button"
        >
          <MdFlag size={iconsize} style={{ color: 'green' }} />
        </PriorityButton>
        <PriorityButton
          onClick={() => updateEmployeeTaskPriority('neutral')}
          type="button"
        >
          <MdFlag size={iconsize} style={{ color: 'yellow' }} />
        </PriorityButton>
        <PriorityButton
          onClick={() => updateEmployeeTaskPriority('high')}
          type="button"
        >
          <MdFlag size={iconsize} style={{ color: 'red' }} />
        </PriorityButton>
      </span>
    </Container>
  );
};

export default TaskPriorityContainer;
