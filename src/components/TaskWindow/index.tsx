import React, { useCallback, useState } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import ITasks from '../../dtos/ITaskDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import sleepyTask from '../../assets/sleepyTask.svg';
import runningTask from '../../assets/runningTask.svg';
import doneTask from '../../assets/doneTask.svg';

import { Container, Task, Main } from './styles';

interface IProps {
  task: ITasks;
  getEmployeeTasks: Function;
}

const TaskWindow: React.FC<IProps> = ({ task, getEmployeeTasks }: IProps) => {
  const { addToast } = useToast();

  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleTaskStatus = useCallback((props: string) => {
    setTaskStatus(props);
  }, []);

  const updateEmployeeTaskIsActive = useCallback(
    async (xtask: ITasks) => {
      try {
        await api.put(`check-lists/tasks/edit/${xtask.id}`, {
          task: xtask.task,
          color: xtask.color,
          isActive: !xtask.isActive,
          priority: xtask.priority,
          status: xtask.status,
          due_date: xtask.due_date,
        });
        getEmployeeTasks();
        addToast({
          type: 'success',
          title: 'Tarefa atualizada com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [getEmployeeTasks, addToast],
  );
  const updateEmployeeTaskStatus = useCallback(
    async (xtask: ITasks) => {
      try {
        await api.put(`check-lists/tasks/edit/${xtask.id}`, {
          task: xtask.task,
          color: xtask.color,
          isActive: xtask.isActive,
          priority: xtask.priority,
          status: taskStatus,
          due_date: xtask.due_date,
        });
        getEmployeeTasks();
        addToast({
          type: 'success',
          title: 'Tarefa atualizada com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [getEmployeeTasks, addToast, taskStatus],
  );

  return (
    <Main>
      <h2>Tarefas do Dia</h2>
      <Container>
        <Task key={task.id}>
          <div>
            <h2>{task.task}</h2>
            <div>
              {task.status === '1' && (
                <img src={sleepyTask} alt="Sleepy Task - We Plan" />
              )}
              {task.status === '2' && (
                <img src={runningTask} alt="Running Task - We Plan" />
              )}
              {task.status === '3' && (
                <img src={doneTask} alt="Done Task - We Plan" />
              )}
            </div>
            <span>
              <p>Data de entrega: {task.due_date}</p>
              <p>Status: {task.status}</p>
            </span>
          </div>

          <button
            type="button"
            onClick={() => updateEmployeeTaskIsActive(task)}
          >
            {task.isActive ? (
              <FiCheckSquare size={30} />
            ) : (
              <FiSquare size={30} />
            )}
          </button>
        </Task>
      </Container>
    </Main>
  );
};

export default TaskWindow;
