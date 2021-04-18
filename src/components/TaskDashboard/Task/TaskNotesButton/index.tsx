import React, { useCallback, useEffect, useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import ITaskDTO from '../../../../dtos/ITaskDTO';
import { Container, NewTaskNotesContainer } from './styles';
import TaskNotes from '../../TaskNotes';
import { useCheckList } from '../../../../hooks/checkList';

interface IProps {
  task: ITaskDTO;
}

const TaskNotesButton: React.FC<IProps> = ({ task }) => {
  const { selectTask, selectedTask } = useCheckList();
  const [taskNotesWindow, setTaskNotesWindow] = useState(false);
  const [newTaskNotes, setNewTaskNotes] = useState(0);

  const handleTaskNotesWindow = useCallback(
    (e: boolean) => {
      e && selectTask(task);
      setTaskNotesWindow(e);
    },
    [selectTask, task],
  );

  useEffect(() => {
    if (task.notes.length > 0) {
      setNewTaskNotes(
        task.notes.filter(note => note.note.isNew === true).length,
      );
    }
  }, [task]);

  return (
    <>
      {taskNotesWindow && selectedTask && selectedTask.id && (
        <TaskNotes closeWindow={() => handleTaskNotesWindow(false)} />
      )}
      <Container>
        {newTaskNotes > 0 && (
          <NewTaskNotesContainer>
            <p>{newTaskNotes}</p>
          </NewTaskNotesContainer>
        )}
        <button
          type="button"
          onClick={() => handleTaskNotesWindow(!taskNotesWindow)}
        >
          <FiFileText color="rgba(100, 222, 255)" size={28} />
        </button>
      </Container>
    </>
  );
};

export default TaskNotesButton;
