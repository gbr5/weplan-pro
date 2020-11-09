import React, { MouseEventHandler } from 'react';
import { FiCalendar, FiChevronsLeft } from 'react-icons/fi';
import {
  MdFlare,
  MdSchedule,
  MdTimelapse,
  MdTimeline,
  MdToday,
} from 'react-icons/md';
import { useAuth } from '../../hooks/auth';
import checkListIcon from '../../assets/task_icon.svg';

import { ArrowButton, Container, Button } from './styles';

interface IProps {
  handleSideMenu: MouseEventHandler;
  handleMainDashboard: MouseEventHandler;
  handleTaskDashboard: MouseEventHandler;
  isActive: boolean;
}

const SideMenu: React.FC<IProps> = ({
  handleSideMenu,
  isActive,
  handleMainDashboard,
  handleTaskDashboard,
}: IProps) => {
  const { companyInfo, company } = useAuth();
  return (
    <>
      <Container>
        <img src={companyInfo.logo_url} alt={company.name} />
        {isActive && (
          <ArrowButton type="button" onClick={handleSideMenu}>
            <FiChevronsLeft size={32} />
          </ArrowButton>
        )}
        <div>
          <Button type="button" onClick={handleMainDashboard}>
            <MdFlare />
          </Button>
          <Button type="button" onClick={handleTaskDashboard}>
            <img src={checkListIcon} alt="WePlan_Check_List" />
          </Button>
          <Button type="button">
            <MdTimeline />
          </Button>
          <Button type="button">
            <MdTimelapse />
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
