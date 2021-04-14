import React, { useCallback, useEffect, useState } from 'react';
import Task from '../Task';

import { Container, Main } from './styles';
import TaskStatusMenu from '../TaskStatusMenu';
import { useCheckList } from '../../../hooks/checkList';

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
      {/*
      <StatusMenuButtonContainer>
        <StatusMenuButton
          isActive={statusSection === '1'}
          type="button"
          onClick={handleNotStartedTasksSection}
        >
          Início
        </StatusMenuButton>
        <StatusMenuButton
          isActive={statusSection === '2'}
          type="button"
          onClick={handleInProgressTasksSection}
        >
          Andamento
        </StatusMenuButton>
        <StatusMenuButton
          isActive={statusSection === '3'}
          type="button"
          onClick={handleFinishedTasksSection}
        >
          Realizadas
        </StatusMenuButton>
      </StatusMenuButtonContainer> */}
      <Container>
        {statusSection === '1' &&
          employeeNotStartedTasks.map(task => {
            return (
              <Task
                update={getEmployeeTasks}
                key={task.id}
                backgroundColor="#ebf8ff"
                task={task}
              />
            );
          })}
        {statusSection === '2' &&
          employeeInProgressTasks.map(task => (
            <Task
              update={getEmployeeTasks}
              key={task.id}
              backgroundColor="#fddede"
              task={task}
            />
          ))}
        {statusSection === '3' &&
          employeeFinishedTasks.map(task => (
            <Task
              update={getEmployeeTasks}
              key={task.id}
              backgroundColor="#e6fffa"
              task={task}
            />
          ))}
      </Container>
    </Main>
  );
};

export default AllTasksSection;
