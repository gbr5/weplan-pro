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
  return (
    <Container>
      <StatusMenuButton
        isActive={currentSection === '1'}
        type="button"
        onClick={() => handleSection('1')}
      >
        <img src={sleepyTask} alt="Not started tasks" />
        <p>Início</p>
      </StatusMenuButton>
      <StatusMenuButton
        isActive={currentSection === '2'}
        type="button"
        onClick={() => handleSection('2')}
      >
        <img src={runningTask} alt="Running tasks" />
        <p>Execução</p>
      </StatusMenuButton>
      <StatusMenuButton
        isActive={currentSection === '3'}
        type="button"
        onClick={() => handleSection('3')}
      >
        <img src={doneTask} alt="Done tasks" />
        <p>Sucesso</p>
      </StatusMenuButton>
    </Container>
  );
};

export default TaskStatusMenu;
