import React, { useCallback } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import ITasks from '../../dtos/ITaskDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container, Task, Main } from './styles';

interface IProps {
  tasks: ITasks[];
  getEmployeeTasks: Function;
}

const MainTaskContainer: React.FC<IProps> = ({
  tasks,
  getEmployeeTasks,
}: IProps) => {
  const { addToast } = useToast();

  const updateEmployeeTaskIsActive = useCallback(
    async (task: ITasks) => {
      try {
        await api.put(`check-lists/tasks/edit/${task.id}`, {
          task: task.task,
          color: task.color,
          isActive: !task.isActive,
          priority: task.priority,
          status: task.status,
          due_date: task.due_date,
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
  return (
    <Main>
      <h2>Tarefas do Dia</h2>
      <Container>
        {tasks.map(task => (
          <Task key={task.id}>
            <div>
              <h2>{task.task}</h2>

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
        ))}
      </Container>
    </Main>
  );
};

export default MainTaskContainer;