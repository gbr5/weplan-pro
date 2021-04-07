import React from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import { useTask } from '../../hooks/task';

import { Container, Task, Main } from './styles';

const MainTaskContainer: React.FC = () => {
  const { updateEmployeeTaskIsActive, dayTasks } = useTask();

  return (
    <Main>
      <h2>Tarefas do Dia</h2>
      <Container>
        {dayTasks.map(task => (
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
