import React from 'react';
import { useCheckList } from '../../hooks/checkList';
import { sortActiveTasks } from '../../utils/sortActiveTasks';
import Task from '../TaskDashboard/Task';

import { Container, Main } from './styles';

const MainTaskContainer: React.FC = () => {
  const { dayTasks, getEmployeeTasksByDate } = useCheckList();

  return (
    <Main>
      <h2>Tarefas do Dia</h2>
      <Container>
        {sortActiveTasks(dayTasks).map(task => {
          return (
            <Task update={getEmployeeTasksByDate} key={task.id} task={task} />
          );
        })}
      </Container>
    </Main>
  );
};

export default MainTaskContainer;
