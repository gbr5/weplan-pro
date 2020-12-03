import React, { MouseEventHandler } from 'react';
import { FiCalendar, FiChevronsLeft } from 'react-icons/fi';
import { MdFlare, MdSchedule, MdTimeline, MdToday } from 'react-icons/md';
import { useAuth } from '../../hooks/auth';
import checkListIcon from '../../assets/task_icon.svg';
import meetingIcon from '../../assets/meeting.svg';

import {
  ArrowButton,
  Container,
  Button,
  MainDashboardImageButton,
} from './styles';

interface IProps {
  handleSideMenu: MouseEventHandler;
  handleMainDashboard: MouseEventHandler;
  handleTaskDashboard: MouseEventHandler;
  handleCustomerServiceOrderDashboard: MouseEventHandler;
  isActive: boolean;
}

const SideMenu: React.FC<IProps> = ({
  handleSideMenu,
  isActive,
  handleMainDashboard,
  handleTaskDashboard,
  handleCustomerServiceOrderDashboard,
}: IProps) => {
  const { companyInfo, company } = useAuth();
  return (
    <>
      <Container>
        <MainDashboardImageButton type="button" onClick={handleMainDashboard}>
          <img src={companyInfo.logo_url} alt={company.name} />
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
          <Button type="button">
            <MdTimeline />
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
