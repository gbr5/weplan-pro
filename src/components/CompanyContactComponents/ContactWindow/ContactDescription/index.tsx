import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import ICompanyContactDTO from '../../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import formatTextArea from '../../../../utils/formatTextArea';
import Button from '../../../Button';

import { Container, FieldContainer, EditFieldContainer } from './styles';

const ContactDescription: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const iconSize = 24;

  const {
    updateCompanyContactDescription,
    selectedContact,
  } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);

  const [rows, setRows] = useState(2);

  const handleChange = useCallback(() => {
    const textArea = textAreaRef.current;

    if (textArea) {
      const numberOfRows = formatTextArea({ textArea });

      setRows(numberOfRows);
    }
  }, []);

  const handleSubmit = useCallback(
    (data: ICompanyContactDTO) => {
      updateCompanyContactDescription(selectedContact.id, data.description);
      setEditContactField(false);
    },
    [updateCompanyContactDescription, selectedContact],
  );

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
        <>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <EditFieldContainer>
              <section>
                <strong>Descrição</strong>
                <textarea
                  ref={textAreaRef}
                  cols={22}
                  rows={rows}
                  defaultValue={selectedContact.description}
                  onChange={handleChange}
                  placeholder={selectedContact.description}
                  name="description"
                />
              </section>
              <Button type="submit">Salvar</Button>
            </EditFieldContainer>
          </Form>
        </>
      ) : (
        <FieldContainer>
          <strong>Descrição</strong>
          <p>{selectedContact.description}</p>
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactDescription;
