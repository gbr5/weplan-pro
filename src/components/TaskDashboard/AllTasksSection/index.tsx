import React, { useCallback, useEffect, useState } from 'react';
import api from '../../../services/api';
import Task from '../Task';

import { Container, Main } from './styles';
import { useEmployeeAuth } from '../../../hooks/employeeAuth';
import ITaskDTO from '../../../dtos/ITaskDTO';
import TaskStatusMenu from '../TaskStatusMenu';

const AllTasksSection: React.FC = () => {
  const { employee } = useEmployeeAuth();

  const [employeeNotStartedTasks, setEmployeeNotStartedTasks] = useState<
    ITaskDTO[]
  >([]);
  const [employeeInProgressTasks, setEmployeeInProgressTasks] = useState<
    ITaskDTO[]
  >([]);
  const [employeeFinishedTasks, setEmployeeFinishedTasks] = useState<
    ITaskDTO[]
  >([]);
  const [statusSection, setStatusSection] = useState('2');

  const getEmployeeTasks = useCallback(() => {
    try {
      employee &&
        employee.company &&
        employee.employeeUser &&
        api
          .get<ITaskDTO[]>(
            `check-lists/tasks/${employee.company.id}/${employee.employeeUser.id}`,
          )
          .then(response => {
            const activeTasks = response.data.filter(task => task.isActive);
            setEmployeeNotStartedTasks(
              activeTasks.filter(task => task.status === '1'),
            );
            setEmployeeInProgressTasks(
              activeTasks.filter(task => task.status === '2'),
            );
            setEmployeeFinishedTasks(
              activeTasks.filter(task => task.status === '3'),
            );
          });
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  useEffect(() => {
    getEmployeeTasks();
  }, [getEmployeeTasks]);

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
            return <Task key={task.id} backgroundColor="#ebf8ff" task={task} />;
          })}
        {statusSection === '2' &&
          employeeInProgressTasks.map(task => (
            <Task key={task.id} backgroundColor="#fddede" task={task} />
          ))}
        {statusSection === '3' &&
          employeeFinishedTasks.map(task => (
            <Task key={task.id} backgroundColor="#e6fffa" task={task} />
          ))}
      </Container>
    </Main>
  );
};

export default AllTasksSection;
