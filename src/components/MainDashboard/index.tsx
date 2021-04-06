import React, { useCallback, useEffect, useState } from 'react';
import CalendarDashboard from '../CalendarDashboard';
import MainTaskContainer from '../MainTaskContainer';

import { Container, FirstRow } from './styles';
import AllTasksSection from './AllTasksSection';
import ITasks from '../../dtos/ITaskDTO';
import api from '../../services/api';
import { useEmployeeAuth } from '../../hooks/employeeAuth';

const TasksDashboard: React.FC = () => {
  const { employee } = useEmployeeAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayTasks, setDayTasks] = useState<ITasks[]>([]);
  const getEmployeeTasks = useCallback(() => {
    employee &&
      employee.company &&
      employee.employeeUser &&
      api
        .get<ITasks[]>(
          `/check-lists/tasks/${employee?.company.id}/${employee.employeeUser.id}`,
          {
            params: {
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            },
          },
        )
        .then(response => {
          setDayTasks(response.data);
        });
  }, [selectedDate, employee]);

  useEffect(() => {
    getEmployeeTasks();
  }, [getEmployeeTasks]);

  return (
    <Container>
      <FirstRow>
        <MainTaskContainer
          getEmployeeTasks={getEmployeeTasks}
          tasks={dayTasks}
        />
        <CalendarDashboard handleSetDate={(e: Date) => setSelectedDate(e)} />
      </FirstRow>
      <AllTasksSection />
    </Container>
  );
};

export default TasksDashboard;
