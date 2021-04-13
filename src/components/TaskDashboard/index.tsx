import React from 'react';
import CalendarDashboard from '../CalendarDashboard';
import MainTaskContainer from '../MainTaskContainer';

import { Container, FirstRow } from './styles';
import AllTasksSection from './AllTasksSection';
import Header from '../Header';
import MenuButton from '../MenuButton';

const TasksDashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <MenuButton />
      <FirstRow>
        <CalendarDashboard />
        <MainTaskContainer />
      </FirstRow>
      <AllTasksSection />
    </Container>
  );
};

export default TasksDashboard;
