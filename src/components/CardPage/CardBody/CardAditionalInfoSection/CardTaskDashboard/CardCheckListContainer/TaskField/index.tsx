import React, { useCallback, useState } from 'react';
import { useCheckList } from '../../../../../../../hooks/checkList';
import InlineFormField from '../../../../../../GeneralComponents/InlineFormField';

import { Container } from './styles';

const TaskField: React.FC = () => {
  const { selectedTask, updateTask } = useCheckList();

  const [editField, setEditField] = useState(false);

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleEditTask = useCallback(
    async (task: string) => {
      await updateTask({
        ...selectedTask,
        task,
      });
      setEditField(false);
    },
    [updateTask, selectedTask],
  );

  return (
    <Container>
      {editField ? (
        <InlineFormField
          closeComponent={() => handleEditField(false)}
          defaultValue={selectedTask.task}
          placeholder={selectedTask.task}
          handleOnSubmit={(task: string) => handleEditTask(task)}
        />
      ) : (
        <>
          <strong>Nome da tarefa</strong>
          <button type="button" onClick={() => handleEditField(true)}>
            {selectedTask.task}
          </button>
        </>
      )}
    </Container>
  );
};

export default TaskField;
