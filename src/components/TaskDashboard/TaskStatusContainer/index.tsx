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
  const { updateTask, createTaskNote } = useCheckList();

  const updateEmployeeTaskStatus = useCallback(
    async status => {
      let oldStatus = 'Início';
      if (task.status === '2') oldStatus = 'Execução';
      if (task.status === '3') oldStatus = 'Finalidada';
      let newStatus = 'Início';
      if (status === '2') newStatus = 'Execução';
      if (status === '3') newStatus = 'Finalidada';
      await updateTask({
        ...task,
        status,
      });

      createTaskNote({
        note: `Tarefa Editada|||\nTarefa: ${task.task}\nAntigo Status: ${oldStatus}\n.\nNovo Status: ${newStatus}\n. . . . .`,
        task_id: task.id,
        check_list_id: task.check_list_id,
      });
      update();
      closeWindow();
    },
    [task, update, updateTask, closeWindow, createTaskNote],
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
