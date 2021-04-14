import React from 'react';

import sleepyTask from '../../../assets/sleepyTask1.svg';
import runningTask from '../../../assets/runningTask1.svg';
import doneTask from '../../../assets/doneTask1.svg';

import { Container, StatusMenuButton } from './styles';

interface IProps {
  currentSection: string;
  handleSection: (e: string) => void;
}

const TaskStatusMenu: React.FC<IProps> = ({
  currentSection,
  handleSection,
}) => {
  // const iconsize = 40;
  return (
    <Container>
      <StatusMenuButton
        isActive={currentSection === '1'}
        type="button"
        onClick={() => handleSection('1')}
      >
        <img src={sleepyTask} alt="Not started tasks" />
      </StatusMenuButton>
      <StatusMenuButton
        isActive={currentSection === '2'}
        type="button"
        onClick={() => handleSection('2')}
      >
        <img src={runningTask} alt="Running tasks" />
      </StatusMenuButton>
      <StatusMenuButton
        isActive={currentSection === '3'}
        type="button"
        onClick={() => handleSection('3')}
      >
        <img src={doneTask} alt="Done tasks" />
      </StatusMenuButton>
    </Container>
  );
};

export default TaskStatusMenu;
