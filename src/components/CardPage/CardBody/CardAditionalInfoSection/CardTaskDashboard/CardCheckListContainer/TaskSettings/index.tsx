import React, { useCallback, useState } from 'react';
import { useCheckList } from '../../../../../../../hooks/checkList';
import Button from '../../../../../../Button';
import ConfirmationWindow from '../../../../../../GeneralComponents/ConfirmationWindow';
import WindowContainer from '../../../../../../WindowContainer';
import TaskDueDateField from '../TaskDueDateField';
import TaskField from '../TaskField';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
}

const TaskSettings: React.FC<IProps> = ({ closeWindow }) => {
  const { selectedTask, deleteTask } = useCheckList();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDeleteTask = useCallback(async () => {
    console.log(selectedTask);
    deleteTask(selectedTask.id);
    setDeleteConfirmation(false);
  }, [deleteTask, selectedTask]);

  const handleDeleteConfirmation = useCallback(async (e: boolean) => {
    return setDeleteConfirmation(e);
  }, []);

  return (
    <>
      {deleteConfirmation && (
        <ConfirmationWindow
          message="Deseja realmente deletar a tarefa?"
          closeWindow={() => handleDeleteConfirmation(false)}
          firstButtonLabel="Deletar"
          firstButtonFunction={handleDeleteTask}
          secondButtonLabel="Não Deletar"
          secondButtonFunction={() => handleDeleteConfirmation(false)}
          zIndex={16}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={() => closeWindow()}
        containerStyle={{
          zIndex: 15,
          top: '5%',
          left: '5%',
          height: '90%',
          width: '90%',
        }}
      >
        <Container>
          <h2>Configurações</h2>
          <TaskField />
          <TaskDueDateField />
          <Button
            style={{ background: 'red', color: '#c9c9c9', fontSize: '1.3rem' }}
            type="button"
            onClick={() => handleDeleteConfirmation(true)}
          >
            Deletar
          </Button>
        </Container>
      </WindowContainer>
    </>
  );
};

export default TaskSettings;
