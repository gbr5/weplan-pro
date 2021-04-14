import React from 'react';
import { useCheckList } from '../../hooks/checkList';
import Task from '../TaskDashboard/Task';

import { Container, Main } from './styles';

const MainTaskContainer: React.FC = () => {
  const { dayTasks, getEmployeeTasksByDate } = useCheckList();

  return (
    <Main>
      <h2>Tarefas do Dia</h2>
      <Container>
        {dayTasks.map(task => {
          return (
            <Task
              update={getEmployeeTasksByDate}
              key={task.id}
              backgroundColor="#fddede"
              task={task}
            />
          );
        })}
      </Container>
    </Main>
  );
};

export default MainTaskContainer;
