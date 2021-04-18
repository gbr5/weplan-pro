import React, { useCallback, useState } from 'react';
import { MdFlag } from 'react-icons/md';
import ITaskDTO from '../../../../dtos/ITaskDTO';
import TaskPriorityContainer from '../../TaskPriorityContainer';

import { Container, SelectPriorityContainer } from './styles';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

const PriorityButton: React.FC<IProps> = ({ task, update }) => {
  const iconsize = 26;
  const [priorityWindow, setPriorityWindow] = useState(false);

  const handlePriorityWindow = useCallback((e: boolean) => {
    setPriorityWindow(e);
  }, []);

  return (
    <Container>
      {priorityWindow && (
        <SelectPriorityContainer>
          <TaskPriorityContainer
            task={task}
            closeWindow={() => handlePriorityWindow(false)}
            update={update}
          />
          <span />
        </SelectPriorityContainer>
      )}
      <button
        type="button"
        onClick={() => handlePriorityWindow(!priorityWindow)}
      >
        {task.priority === 'low' && (
          <MdFlag size={iconsize} style={{ color: 'green' }} />
        )}
        {task.priority === 'neutral' && (
          <MdFlag size={iconsize} style={{ color: 'yellow' }} />
        )}
        {task.priority === 'high' && (
          <MdFlag size={iconsize} style={{ color: 'red' }} />
        )}
      </button>
    </Container>
  );
};

export default PriorityButton;
