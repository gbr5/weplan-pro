import React, { useCallback, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useCheckList } from '../../../../hooks/checkList';
import ConfirmationWindow from '../../../GeneralComponents/ConfirmationWindow';

import { Container } from './styles';

interface IProps {
  update: Function;
}

const TaskDeleteButton: React.FC<IProps> = ({ update }) => {
  const { selectedTask, updateTask } = useCheckList();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDeleteTask = useCallback(async () => {
    await updateTask({
      ...selectedTask,
      isActive: false,
    });
    setDeleteConfirmation(false);
    update();
  }, [updateTask, update, selectedTask]);

  const handleDeleteConfirmation = useCallback(async (e: boolean) => {
    return setDeleteConfirmation(e);
  }, []);

  return (
    <>
      {deleteConfirmation && (
        <ConfirmationWindow
          closeWindow={() => handleDeleteConfirmation(false)}
          firstButtonFunction={handleDeleteTask}
          firstButtonLabel="Deletar"
          message="Deseja mesmo deletar a tarefa"
          secondButtonFunction={() => handleDeleteConfirmation(false)}
          secondButtonLabel="Não Deletar"
          zIndex={15}
        />
      )}
      <Container>
        <button
          type="button"
          onClick={() => handleDeleteConfirmation(!deleteConfirmation)}
        >
          <FiTrash2 size={28} />
        </button>
      </Container>
    </>
  );
};

export default TaskDeleteButton;
