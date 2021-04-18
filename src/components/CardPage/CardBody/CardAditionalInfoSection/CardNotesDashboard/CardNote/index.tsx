import React, { useEffect, useMemo, useState } from 'react';

import { Container, Note, HistoryNote } from './styles';

import ICardNotesDTO from '../../../../../../dtos/ICardNotesDTO';
import { useEmployeeAuth } from '../../../../../../hooks/employeeAuth';
import formatHourDateShort from '../../../../../../utils/formatHourDateShort';
import { useCompanyContact } from '../../../../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../../../../hooks/companyEmployee';

interface IProps {
  cardNote: ICardNotesDTO;
  isSelected: boolean;
  handleSetSelectedNote: Function;
}

const CardNote: React.FC<IProps> = ({
  cardNote,
  isSelected,
  handleSetSelectedNote,
}: IProps) => {
  const { employee } = useEmployeeAuth();
  const { getEmployeeContact } = useCompanyContact();
  const { companyEmployees } = useCompanyEmployee();

  const [noteTitle, setNoteTitle] = useState('');
  const [note, setNote] = useState(cardNote.note);

  const author = useMemo(async () => {
    if (cardNote.user_id === employee.company.id) {
      return 'WePlan';
    }
    const findEmployee = companyEmployees.filter(
      thisemployee => thisemployee.employeeUser.id === cardNote.user_id,
    )[0];
    const findAuthor = await getEmployeeContact(findEmployee.id);
    return findAuthor ? `${findAuthor.name} ${findAuthor.family_name}` : '';
  }, [companyEmployees, getEmployeeContact, cardNote, employee]);

  useEffect(() => {
    if (cardNote.user_id === employee.company.id) {
      const noteSplit =
        cardNote.note.includes('|||') && cardNote.note.split('|||');
      const oldNoteSplit =
        !cardNote.note.includes('|||') &&
        cardNote.note.includes('|') &&
        cardNote.note.split('|');
      noteSplit && setNoteTitle(noteSplit[0]);
      noteSplit && setNote(noteSplit[1]);
      oldNoteSplit && setNoteTitle(oldNoteSplit[0]);
      oldNoteSplit && setNote(oldNoteSplit[1]);
    }
  }, [cardNote, employee]);

  let phraseIndex = 0;

  return (
    <Container
      onClick={() => handleSetSelectedNote(cardNote)}
      isActive={isSelected}
    >
      {cardNote.user_id !== employee.company.id ? (
        <>
          <Note>
            {cardNote.note.split('\n').map(phrase => {
              phraseIndex += 1;
              return <p key={phraseIndex}>{phrase}</p>;
            })}
          </Note>

          <footer>
            <strong>{formatHourDateShort(String(cardNote.created_at))}</strong>
            {cardNote.user_id !== employee.company.id &&
              (cardNote.user_id !== employee.employeeUser.id ? (
                <strong>{author}</strong>
              ) : (
                <strong>Você enviou</strong>
              ))}
            {cardNote.created_at !== cardNote.updated_at && (
              <strong>
                Atualizado: {formatHourDateShort(String(cardNote.updated_at))}
              </strong>
            )}
          </footer>
        </>
      ) : (
        <HistoryNote>
          <h3>{noteTitle}</h3>
          <Note>
            {note.includes('\n') ? (
              note.split('\n').map(paragraph => {
                phraseIndex += 1;
                return <strong key={phraseIndex}>{paragraph}</strong>;
              })
            ) : (
              <strong>{note}</strong>
            )}
          </Note>
        </HistoryNote>
      )}
    </Container>
  );
};

export default CardNote;
