import React, { useCallback, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useCheckList } from '../../../../../../../hooks/checkList';
import formatHourDateShort from '../../../../../../../utils/formatHourDateShort';
import CreateTaskDueDate from '../../AddCardTaskForm/CreateTaskDueDate';

import { Container } from './styles';

interface IProps {
  update: Function;
}

const TaskDueDateField: React.FC<IProps> = ({ update }) => {
  const { selectedTask, updateTask } = useCheckList();

  const [editField, setEditField] = useState(false);

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleEditDueDate = useCallback(
    async (due_date: string) => {
      await updateTask({
        ...selectedTask,
        due_date,
      });
      update();
    },
    [updateTask, update, selectedTask],
  );
  return (
    <Container>
      {editField ? (
        <>
          <span>
            <button type="button" onClick={() => handleEditField(false)}>
              <MdClose size={32} color="red" />
            </button>
          </span>
          <CreateTaskDueDate nextStep={(e: string) => handleEditDueDate(e)} />
        </>
      ) : (
        <>
          <strong>Data de Entrega</strong>
          <button type="button" onClick={() => handleEditField(true)}>
            {formatHourDateShort(String(selectedTask.due_date))}
          </button>
        </>
      )}
    </Container>
  );
};

export default TaskDueDateField;
