import React, { useCallback, useEffect, useState } from 'react';
import Task from '../Task';

import { Container, Main } from './styles';
import TaskStatusMenu from '../TaskStatusMenu';
import { useCheckList } from '../../../hooks/checkList';
import { sortActiveTasks } from '../../../utils/sortActiveTasks';

const AllTasksSection: React.FC = () => {
  const {
    getEmployeeTasks,
    employeeFinishedTasks,
    employeeInProgressTasks,
    employeeNotStartedTasks,
  } = useCheckList();

  useEffect(() => {
    getEmployeeTasks();
  }, [getEmployeeTasks]);
  const [statusSection, setStatusSection] = useState('2');

  const handleTaskStatusSection = useCallback((e: string) => {
    setStatusSection(e);
  }, []);

  return (
    <Main>
      <h2>Suas Tarefas</h2>
      <TaskStatusMenu
        currentSection={statusSection}
        handleSection={(e: string) => handleTaskStatusSection(e)}
      />
      <Container>
        {statusSection === '1' &&
          sortActiveTasks(employeeNotStartedTasks).map(task => {
            return <Task update={getEmployeeTasks} key={task.id} task={task} />;
          })}
        {statusSection === '2' &&
          sortActiveTasks(employeeInProgressTasks).map(task => (
            <Task update={getEmployeeTasks} key={task.id} task={task} />
          ))}
        {statusSection === '3' &&
          sortActiveTasks(employeeFinishedTasks).map(task => (
            <Task update={getEmployeeTasks} key={task.id} task={task} />
          ))}
      </Container>
    </Main>
  );
};

export default AllTasksSection;
