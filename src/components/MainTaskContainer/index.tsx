import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import ITasks from '../../dtos/ITaskDTO';

import { Container, Task, Main } from './styles';

interface IProps {
  tasks: ITasks[];
}

const MainTaskContainer: React.FC<IProps> = ({ tasks }: IProps) => {
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
            <button type="button">
              <FiChevronRight size={30} />
            </button>
          </Task>
        ))}
      </Container>
    </Main>
  );
};

export default MainTaskContainer;
