import React, { useCallback, useState } from 'react';
import WindowContainer from '../../../../../WindowContainer';
import { useToast } from '../../../../../../hooks/toast';

import CreateTaskName from './CreateTaskName';
import { useCheckList } from '../../../../../../hooks/checkList';
import CreateTaskPriority from './CreateTaskPriority';
import CreateTaskStatus from './CreateTaskStatus';
import CreateTaskDueDate from './CreateTaskDueDate';
import CreateTaskDueTime from './CreateTaskDueTime';
import { useStageCard } from '../../../../../../hooks/stageCard';

interface IProps {
  closeWindow: Function;
}

const AddCardTaskForm: React.FC<IProps> = ({ closeWindow }: IProps) => {
  const { addToast } = useToast();
  const { createCardTask, selectedCheckList } = useCheckList();
  const { getCardCheckLists, selectedCard } = useStageCard();

  const [taskNameField, setTaskNameField] = useState(true);
  const [taskPriorityField, setTaskPriorityField] = useState(false);
  const [taskStatusField, setTaskStatusField] = useState(false);
  const [taskDueDateField, setTaskDueDateField] = useState(false);
  const [taskDueTimeField, setTaskDueTimeField] = useState(false);

  const handleCloseAllFields = useCallback(() => {
    setTaskNameField(false);
    setTaskPriorityField(false);
    setTaskStatusField(false);
    setTaskDueDateField(false);
    setTaskDueTimeField(false);
  }, []);

  const handleTaskPriority = useCallback(() => {
    handleCloseAllFields();
    setTaskPriorityField(true);
  }, [handleCloseAllFields]);
  const handleTaskStatus = useCallback(() => {
    handleCloseAllFields();
    setTaskStatusField(true);
  }, [handleCloseAllFields]);
  const handleTaskDueDate = useCallback(() => {
    handleCloseAllFields();
    setTaskDueDateField(true);
  }, [handleCloseAllFields]);
  const handleTaskDueTime = useCallback(() => {
    handleCloseAllFields();
    setTaskDueTimeField(true);
  }, [handleCloseAllFields]);

  const handleSubmit = useCallback(
    async (due_date: string) => {
      try {
        createCardTask({
          check_list_id: selectedCheckList.id,
          due_date,
          card: selectedCard,
        });
        getCardCheckLists();
        closeWindow();
        return addToast({
          type: 'success',
          title: 'Tarefa criada com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar tarefa!',
          description: 'Tente novamente',
        });

        throw new Error(err);
      }
    },
    [
      addToast,
      getCardCheckLists,
      closeWindow,
      createCardTask,
      selectedCard,
      selectedCheckList,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 10,
        top: '15%',
        left: '2.5%',
        height: '70%',
        width: '95%',
      }}
    >
      {taskNameField && (
        <CreateTaskName
          closeWindow={closeWindow}
          nextStep={() => handleTaskPriority()}
        />
      )}
      {taskPriorityField && (
        <CreateTaskPriority nextStep={() => handleTaskStatus()} />
      )}
      {taskStatusField && (
        <CreateTaskStatus nextStep={() => handleTaskDueDate()} />
      )}
      {taskDueDateField && (
        <CreateTaskDueDate nextStep={() => handleTaskDueTime()} />
      )}
      {taskDueTimeField && (
        <CreateTaskDueTime
          nextStep={(due_date: string) => handleSubmit(due_date)}
        />
      )}
    </WindowContainer>
  );
};

export default AddCardTaskForm;
