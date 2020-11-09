import React, { useCallback, useState } from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import CalendarDashboard from '../CalendarDashboard';
import MainTaskContainer from '../MainTaskContainer';
import MainAppointmentsContainer from '../MainAppointmentsContainer';
import MainMessageContainer from '../MainMessageContainer';
import SideMenu from '../SideMenu';

import { Container, ArrowButton, FirstRow, SecondRow } from './styles';
import TaskDashboard from './TaskDashboard';

const MainDashboard: React.FC = () => {
  const [sideMenu, setSideMenu] = useState(true);
  const [mainDashboard, setMainDashboard] = useState(true);
  const [taskDashboard, setTaskDashboard] = useState(false);

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
              <MainTaskContainer />
              <CalendarDashboard />
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
