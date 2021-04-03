import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { htmlToDOM } from 'html-react-parser';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdClose, MdEdit } from 'react-icons/md';
import ICompanyContactNoteDTO from '../../../../dtos/ICompanyContactNoteDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import Button from '../../../Button';
// import Input from '../../../Input';

import { Container, FieldContainer, EditFieldContainer } from './styles';

interface IProps {
  contactNote: ICompanyContactNoteDTO;
}

const ContactNote: React.FC<IProps> = ({ contactNote }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const iconSize = 24;

  const { updateCompanyContactNote } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);

  const handleSubmit = useCallback(() => {
    const text = textAreaRef.current?.innerHTML;
    updateCompanyContactNote({
      id: contactNote.id,
      note: text || '',
      company_contact_id: contactNote.company_contact_id,
      created_at: contactNote.created_at,
      isNew: contactNote.isNew,
      upated_at: contactNote.upated_at,
    });
    setEditContactField(false);
  }, [updateCompanyContactNote, contactNote]);

  useEffect(() => {
    if (contactNote.isNew === true) {
      updateCompanyContactNote({
        ...contactNote,
        isNew: false,
      });
    }
  }, [updateCompanyContactNote, contactNote]);

  const handleEditField = useCallback((e: boolean) => {
    setEditContactField(e);
  }, []);
  return (
    <Container>
      <span>
        <button
          type="button"
          onClick={() => handleEditField(!editContactField)}
        >
          {editContactField ? (
            <MdClose size={iconSize} />
          ) : (
            <MdEdit size={iconSize} />
          )}
        </button>
      </span>
      {editContactField ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <EditFieldContainer>
            <section>
              <textarea
                // dangerouslySetInnerHTML={{ __html: contactNote.note }}
                ref={textAreaRef}
                cols={22}
                rows={6}
                defaultValue={contactNote.note}
                name="note"
                placeholder={contactNote.note}
              />
            </section>
            <Button type="submit">Salvar</Button>
          </EditFieldContainer>
        </Form>
      ) : (
        <FieldContainer>
          {/* eslint-disable-next-line react/no-danger */}
          {/* <div dangerouslySetInnerHTML={{ __html: contactNote.note }} /> */}
          {/* {htmlToDOM(contactNote.note, () => {})} */}
          <p>{contactNote.note}</p>
          <footer>
            <p>{contactNote.created_at}</p>
          </footer>
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactNote;
