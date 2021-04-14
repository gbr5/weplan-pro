import React, { useCallback, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useCheckList } from '../../../../../../../hooks/checkList';
import formatHourDateShort from '../../../../../../../utils/formatHourDateShort';
import CreateTaskDueDate from '../../AddCardTaskForm/CreateTaskDueDate';
import CreateTaskDueTime from '../../AddCardTaskForm/CreateTaskDueTime';

import { Container } from './styles';

interface IProps {
  update: Function;
}

const TaskDueDateField: React.FC<IProps> = ({ update }) => {
  const { selectedTask, updateTask } = useCheckList();

  const [editField, setEditField] = useState(false);
  const [dueDateField, setDueDateField] = useState(true);

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleDueDateField = useCallback((e: string) => {
    // Deixar aqui por enquanto !!
    console.log(e);
    setDueDateField(false);
  }, []);

  const handleEditDueDate = useCallback(
    async (e: string) => {
      const due_date = String(new Date(e));
      await updateTask({
        ...selectedTask,
        due_date,
      });
      setEditField(false);
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
          {dueDateField ? (
            <CreateTaskDueDate
              nextStep={(e: string) => handleDueDateField(e)}
            />
          ) : (
            <CreateTaskDueTime nextStep={(e: string) => handleEditDueDate(e)} />
          )}
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
