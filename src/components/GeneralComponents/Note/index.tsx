import React, { useEffect, useMemo, useState } from 'react';
import INoteDTO from '../../../dtos/INoteDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useEmployeeAuth } from '../../../hooks/employeeAuth';
import formatHourDateShort from '../../../utils/formatHourDateShort';

import { Container, NoteContainer, HistoryNote } from './styles';

interface IProps {
  selectedNote: INoteDTO;
}

const Note: React.FC<IProps> = ({ selectedNote }) => {
  const { employee } = useEmployeeAuth();
  const { companyEmployees } = useCompanyEmployee();
  const { getEmployeeContact } = useCompanyContact();

  const [noteTitle, setNoteTitle] = useState('');
  const [note, setNote] = useState(selectedNote.note);

  const author = useMemo(async () => {
    if (selectedNote.author_id === employee.company.id) {
      return 'WePlan';
    }
    const findEmployee = companyEmployees.filter(
      thisemployee => thisemployee.employeeUser.id === selectedNote.author_id,
    )[0];
    const findAuthor = await getEmployeeContact(findEmployee.id);
    return findAuthor ? `${findAuthor.name} ${findAuthor.family_name}` : '';
  }, [companyEmployees, getEmployeeContact, selectedNote, employee]);

  useEffect(() => {
    if (selectedNote.author_id === employee.company.id) {
      const noteSplit =
        selectedNote.note.includes('|||') && selectedNote.note.split('|||');
      const oldNoteSplit =
        !selectedNote.note.includes('|||') &&
        selectedNote.note.includes('|') &&
        selectedNote.note.split('|');
      noteSplit && setNoteTitle(noteSplit[0]);
      noteSplit && setNote(noteSplit[1]);
      oldNoteSplit && setNoteTitle(oldNoteSplit[0]);
      oldNoteSplit && setNote(oldNoteSplit[1]);
    }
  }, [selectedNote, employee]);

  let phraseIndex = 0;

  return (
    <Container isActive type="button">
      {selectedNote.author_id !== employee.company.id ? (
        <>
          <NoteContainer>
            {selectedNote.note.split('\n').map(phrase => {
              phraseIndex += 1;
              return <p key={phraseIndex}>{phrase}</p>;
            })}
          </NoteContainer>

          <footer>
            <strong>
              {formatHourDateShort(String(selectedNote.created_at))}
            </strong>
            {selectedNote.author_id !== employee.company.id &&
              (selectedNote.author_id !== employee.employeeUser.id ? (
                <strong>{author}</strong>
              ) : (
                <strong>Você enviou</strong>
              ))}
            {selectedNote.created_at !== selectedNote.updated_at && (
              <strong>
                Atualizado:{' '}
                {formatHourDateShort(String(selectedNote.updated_at))}
              </strong>
            )}
          </footer>
        </>
      ) : (
        <HistoryNote>
          <h3>{noteTitle}</h3>
          <NoteContainer>
            {note.includes('\n') ? (
              note.split('\n').map(paragraph => {
                phraseIndex += 1;
                return <strong key={phraseIndex}>{paragraph}</strong>;
              })
            ) : (
              <strong>{note}</strong>
            )}
          </NoteContainer>
        </HistoryNote>
      )}
    </Container>
  );
};

export default Note;
