import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import Button from '../../../Button';

import { Container, AddFieldContainer, AddButton } from './styles';
import formatTextArea from '../../../../utils/formatTextArea';

const CreateContactNote: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const iconSize = 24;

  const { createCompanyContactNote } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [addContactField, setAddContactField] = useState(false);
  const [rows, setRows] = useState(1);

  const handleSubmit = useCallback(() => {
    const text = textAreaRef.current?.innerHTML;
    createCompanyContactNote(text !== undefined ? text : '');
    setAddContactField(false);
  }, [createCompanyContactNote]);

  const handleAddField = useCallback((e: boolean) => {
    setAddContactField(e);
  }, []);

  const handleChange = useCallback(() => {
    const textArea = textAreaRef.current;

    if (textArea) {
      const numberOfRows = formatTextArea({ textArea });

      setRows(numberOfRows);
    }
  }, []);

  return (
    <>
      {addContactField ? (
        <Container>
          <span>
            <button type="button" onClick={() => handleAddField(false)}>
              <FiTrash2 size={iconSize} />
            </button>
          </span>{' '}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <AddFieldContainer>
              <section>
                <textarea
                  onChange={handleChange}
                  ref={textAreaRef}
                  cols={22}
                  rows={rows}
                  name="note"
                />
              </section>
              <Button type="submit">Salvar</Button>
            </AddFieldContainer>
          </Form>
        </Container>
      ) : (
        <AddButton type="button" onClick={() => handleAddField(true)}>
          <MdAdd size={64} />
        </AddButton>
      )}
    </>
  );
};

export default CreateContactNote;
