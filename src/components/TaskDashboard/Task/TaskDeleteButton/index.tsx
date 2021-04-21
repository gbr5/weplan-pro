import React, { useCallback, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import ITaskDTO from '../../../../dtos/ITaskDTO';
import { useCheckList } from '../../../../hooks/checkList';
import ConfirmationWindow from '../../../GeneralComponents/ConfirmationWindow';

import { Container } from './styles';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

const TaskDeleteButton: React.FC<IProps> = ({ update, task }) => {
  const { deleteTask } = useCheckList();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDeleteTask = useCallback(async () => {
    await deleteTask(task.id);
    setDeleteConfirmation(false);
    update();
  }, [deleteTask, update, task]);

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
          message="Deseja deletar a tarefa?"
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
