import React from 'react';
import CalendarDashboard from '../CalendarDashboard';
import MainTaskContainer from '../MainTaskContainer';

import { Container, FirstRow } from './styles';
import AllTasksSection from './AllTasksSection';

const TasksDashboard: React.FC = () => {
  return (
    <Container>
      <FirstRow>
        <CalendarDashboard />
        <MainTaskContainer />
      </FirstRow>
      <AllTasksSection />
    </Container>
  );
};

export default TasksDashboard;
