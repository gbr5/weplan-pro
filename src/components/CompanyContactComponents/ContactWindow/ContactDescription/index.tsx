import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../../hooks/companyEmployee';
import formatTextArea from '../../../../utils/formatTextArea';
import Button from '../../../Button';
import { Container, FieldContainer, EditFieldContainer } from './styles';

interface IFormParams {
  description: string;
}

const ContactDescription: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const iconSize = 24;

  const {
    updateCompanyContactDescription,
    selectedContact,
    contactEmployee,
  } = useCompanyContact();
  const { master } = useCompanyEmployee();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);
  const [contact, setContact] = useState(selectedContact);

  const [rows, setRows] = useState(2);

  const handleChange = useCallback(() => {
    const textArea = textAreaRef.current;

    if (textArea) {
      const numberOfRows = formatTextArea({ textArea });

      setRows(numberOfRows);
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: IFormParams) => {
      // Não retirar por enquanto
      console.log(data);
      const textArea = textAreaRef.current;

      if (textArea) {
        const response = await updateCompanyContactDescription(textArea.value);
        setContact(response);
        setEditContactField(false);
      }
    },
    [updateCompanyContactDescription],
  );

  const handleEditField = useCallback((e: boolean) => {
    setEditContactField(e);
  }, []);

  return (
    <Container>
      {!contactEmployee ? (
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
      ) : (
        master &&
        master.id && (
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
        )
      )}
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
                  defaultValue={contact.description}
                  onChange={handleChange}
                  placeholder={contact.description}
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
          <p>{contact.description}</p>
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactDescription;
