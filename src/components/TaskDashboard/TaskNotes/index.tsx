import React, { useCallback } from 'react';
import ITaskDTO from '../../../dtos/ITaskDTO';
import { useCheckList } from '../../../hooks/checkList';
import CreateNoteForm from '../../GeneralComponents/CreateNoteForm';
import Note from '../../GeneralComponents/Note';
import WindowContainer from '../../WindowContainer';

import { Container, TaskNotesContainer } from './styles';

interface IProps {
  closeWindow: Function;
}

const TaskNotes: React.FC<IProps> = ({ closeWindow }) => {
  const { selectedTask, selectTask, createTaskNote } = useCheckList();

  const handleCreateTaskNote = useCallback(
    (note: string) => {
      createTaskNote({
        note,
        task_id: selectedTask.id,
        check_list_id: selectedTask.check_list_id,
      });
    },
    [createTaskNote, selectedTask],
  );

  const handleCloseWindow = useCallback(() => {
    closeWindow();
    selectTask({} as ITaskDTO);
  }, [closeWindow, selectTask]);

  return (
    <WindowContainer
      onHandleCloseWindow={handleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <CreateNoteForm
          createNote={(note: string) => handleCreateTaskNote(note)}
        />
        <TaskNotesContainer>
          {selectedTask.notes.map(note => {
            return <Note key={note.id} selectedNote={note.note} />;
          })}
        </TaskNotesContainer>
      </Container>
    </WindowContainer>
  );
};

export default TaskNotes;
