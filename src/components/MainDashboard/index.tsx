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
import CustomerServiceOrderDashboard from '../CustomerServiceOrderDashboard';
import CompanyContactDashboard from '../CompanyContactDashboard';
import { useEmployeeAuth } from '../../hooks/employeeAuth';

const MainDashboard: React.FC = () => {
  const { employee } = useEmployeeAuth();

  const [sideMenu, setSideMenu] = useState(true);
  const [mainDashboard, setMainDashboard] = useState(true);
  const [taskDashboard, setTaskDashboard] = useState(false);
  const [companyContactDashboard, setCompanyDashboard] = useState(false);
  const [
    customerServiceOrderDashboard,
    setCustomerServiceOrderDashboard,
  ] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayTasks, setDayTasks] = useState<ITasks[]>([]);

  const handleCloseAllDashboardAndWindows = useCallback(() => {
    setMainDashboard(false);
    setTaskDashboard(false);
    setCompanyDashboard(false);
    setCustomerServiceOrderDashboard(false);
    setSideMenu(true);
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
  const handleCompanyDashboard = useCallback(() => {
    handleCloseAllDashboardAndWindows();
    setCompanyDashboard(true);
  }, [handleCloseAllDashboardAndWindows]);
  const handleCustomerServiceOrderDashboard = useCallback(() => {
    handleCloseAllDashboardAndWindows();
    setCustomerServiceOrderDashboard(true);
  }, [handleCloseAllDashboardAndWindows]);

  const getEmployeeTasks = useCallback(() => {
    employee &&
      employee.company &&
      employee.user &&
      api
        .get<ITasks[]>(
          `/check-lists/tasks/${employee?.company.id}/${employee.user.id}`,
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
    <>
      <Container>
        {sideMenu ? (
          <SideMenu
            handleMainDashboard={handleMainDashboard}
            handleTaskDashboard={handleTaskDashboard}
            handleCompanyDashboard={handleCompanyDashboard}
            handleCustomerServiceOrderDashboard={
              handleCustomerServiceOrderDashboard
            }
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
              <MainTaskContainer
                getEmployeeTasks={getEmployeeTasks}
                tasks={dayTasks}
              />
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
        {!!companyContactDashboard && <CompanyContactDashboard />}
        {!!customerServiceOrderDashboard && <CustomerServiceOrderDashboard />}
      </Container>
    </>
  );
};

export default MainDashboard;
