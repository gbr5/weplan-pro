import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import CalendarDashboard from '../CalendarDashboard';
import MainTaskContainer from '../MainTaskContainer';
import MainAppointmentsContainer from '../MainAppointmentsContainer';
import MainMessageContainer from '../MainMessageContainer';
import SideMenu from '../SideMenu';

import { Container, ArrowButton, FirstRow, SecondRow } from './styles';
import TaskDashboard from './TaskDashboard';
import ITasks from '../../dtos/ITaskDTO';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

const MainDashboard: React.FC = () => {
  const { company, person } = useAuth();

  const [sideMenu, setSideMenu] = useState(true);
  const [mainDashboard, setMainDashboard] = useState(true);
  const [taskDashboard, setTaskDashboard] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayTasks, setDayTasks] = useState<ITasks[]>([]);

  const handleCloseAllDashboardAndWindows = useCallback(() => {
    setMainDashboard(false);
    setTaskDashboard(false);
  }, []);

  const handleSideMenu = useCallback(() => {
    setSideMenu(!sideMenu);
  }, [sideMenu]);

  const handleMainDashboard = useCallback(() => {
    handleCloseAllDashboardAndWindows();
    setMainDashboard(true);
  }, [handleCloseAllDashboardAndWindows]);
  const handleTaskDashboard = useCallback(() => {
    handleCloseAllDashboardAndWindows();
    setTaskDashboard(true);
  }, [handleCloseAllDashboardAndWindows]);

  useEffect(() => {
    api
      .get<ITasks[]>(`/check-lists/tasks/${company.id}/${person.id}`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setDayTasks(response.data);
      });
  }, [selectedDate, company, person]);

  return (
    <>
      <Container>
        {sideMenu ? (
          <SideMenu
            handleMainDashboard={handleMainDashboard}
            handleTaskDashboard={handleTaskDashboard}
            handleSideMenu={handleSideMenu}
            isActive={sideMenu}
          />
        ) : (
          <ArrowButton type="button" onClick={handleSideMenu}>
            <FiChevronsRight size={32} />
          </ArrowButton>
        )}
        {!!mainDashboard && (
          <>
            <FirstRow>
              <MainTaskContainer tasks={dayTasks} />
              <CalendarDashboard
                handleSetDate={(e: Date) => setSelectedDate(e)}
              />
            </FirstRow>
            <SecondRow>
              <MainAppointmentsContainer />
              <MainMessageContainer />
            </SecondRow>
          </>
        )}
        {!!taskDashboard && <TaskDashboard />}
      </Container>
    </>
  );
};

export default MainDashboard;
