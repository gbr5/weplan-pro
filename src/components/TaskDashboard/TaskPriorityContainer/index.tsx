import React, { useCallback } from 'react';
import { MdFlag } from 'react-icons/md';
import { useCheckList } from '../../../hooks/checkList';
import WindowContainer from '../../WindowContainer';

import { Container, PriorityButton } from './styles';

interface IProps {
  closeWindow: Function;
  update: Function;
}

const TaskPriorityContainer: React.FC<IProps> = ({
  closeWindow,
  update,
}: IProps) => {
  const iconsize = 32;
  const { selectedTask, updateTask } = useCheckList();

  const updateEmployeeTaskPriority = useCallback(
    async priority => {
      await updateTask({
        ...selectedTask,
        priority,
      });
      update();
      closeWindow();
    },
    [update, selectedTask, updateTask, closeWindow],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '25%',
        left: '5%',
        width: '90%',
        height: '50%',
      }}
    >
      <Container>
        <h2>Prioridade da tarefa</h2>
        <span>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('low')}
            type="button"
          >
            Baixa
            <MdFlag size={iconsize} style={{ color: 'green' }} />
          </PriorityButton>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('neutral')}
            type="button"
          >
            Moderada
            <MdFlag size={iconsize} style={{ color: 'yellow' }} />
          </PriorityButton>
          <PriorityButton
            onClick={() => updateEmployeeTaskPriority('high')}
            type="button"
          >
            Alta
            <MdFlag size={iconsize} style={{ color: 'red' }} />
          </PriorityButton>
        </span>
      </Container>
    </WindowContainer>
  );
};

export default TaskPriorityContainer;
