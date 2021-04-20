import React, { useCallback, useState } from 'react';
import ITaskDTO from '../../../../dtos/ITaskDTO';
import { useCheckList } from '../../../../hooks/checkList';
import InlineFormField from '../../../GeneralComponents/InlineFormField';

import { Container, TaskNameContainer } from './styles';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

const TaskNameButton: React.FC<IProps> = ({ task, update }) => {
  const { updateTask, createTaskNote } = useCheckList();
  const [editField, setEditField] = useState(false);

  const handleSubmit = useCallback(
    (e: string) => {
      const oldName = task.task;
      updateTask({
        ...task,
        task: e,
      });

      createTaskNote({
        note: `Tarefa Editada|||\n\nTarefa Antiga: ${oldName}\n.\nTarefa Nova: ${e}\n. . . . .`,
        task_id: task.id,
        check_list_id: task.check_list_id,
      });
      update();
    },
    [updateTask, update, task, createTaskNote],
  );

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);
  return (
    <Container>
      {editField ? (
        <InlineFormField
          closeComponent={() => handleEditField(false)}
          defaultValue={task.task}
          handleOnSubmit={(e: string) => handleSubmit(e)}
          placeholder={task.task}
        />
      ) : (
        <TaskNameContainer>
          <button type="button" onClick={() => handleEditField(true)}>
            {task.task}
          </button>
        </TaskNameContainer>
      )}
    </Container>
  );
};

export default TaskNameButton;
