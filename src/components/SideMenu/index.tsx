import React, { MouseEventHandler } from 'react';
import { FiCalendar, FiChevronsLeft } from 'react-icons/fi';
import { MdFlare, MdSchedule, MdToday, MdContacts } from 'react-icons/md';
import checkListIcon from '../../assets/task_icon.svg';
import meetingIcon from '../../assets/meeting.svg';

import {
  ArrowButton,
  Container,
  Button,
  MainDashboardImageButton,
} from './styles';
import { useEmployeeAuth } from '../../hooks/employeeAuth';

interface IProps {
  handleSideMenu: MouseEventHandler;
  handleMainDashboard: MouseEventHandler;
  handleTaskDashboard: MouseEventHandler;
  handleContactDashboard: MouseEventHandler;
  handleCustomerServiceOrderDashboard: MouseEventHandler;
  isActive: boolean;
}

const SideMenu: React.FC<IProps> = ({
  handleSideMenu,
  isActive,
  handleMainDashboard,
  handleTaskDashboard,
  handleContactDashboard,
  handleCustomerServiceOrderDashboard,
}: IProps) => {
  const { employee } = useEmployeeAuth();
  return (
    <>
      <Container>
        <MainDashboardImageButton type="button" onClick={handleMainDashboard}>
          <img
            src={employee.company.companyInfo.logo_url}
            alt={employee.company.name}
          />
        </MainDashboardImageButton>
        {isActive && (
          <ArrowButton type="button" onClick={handleSideMenu}>
            <FiChevronsLeft size={32} />
          </ArrowButton>
        )}
        <div>
          <Button type="button" onClick={handleCustomerServiceOrderDashboard}>
            <MdFlare />
          </Button>
          <Button type="button" onClick={handleTaskDashboard}>
            <img src={checkListIcon} alt="WePlan_Check_List" />
          </Button>
          <Button type="button">
            <img src={meetingIcon} alt="WePlan_Meeting" />
          </Button>
          <Button type="button" onClick={handleContactDashboard}>
            <MdContacts />
          </Button>
          <Button type="button">
            <MdSchedule />
          </Button>
          <Button type="button">
            <FiCalendar />
          </Button>
          <Button type="button">
            <MdToday />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default SideMenu;
