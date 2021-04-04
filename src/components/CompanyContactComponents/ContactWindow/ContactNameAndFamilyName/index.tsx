import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import ICompanyContactDTO from '../../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container, FieldContainer, EditFieldContainer } from './styles';

const ContactNameAndFamilyName: React.FC = () => {
  const iconSize = 24;

  const {
    updateCompanyContactName,
    updateCompanyContactFamilyName,
    selectedContact,
  } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);

  const handleSubmit = useCallback(
    (data: ICompanyContactDTO) => {
      updateCompanyContactName(selectedContact.id, data.name);
      updateCompanyContactFamilyName(selectedContact.id, data.family_name);
      setEditContactField(false);
    },
    [updateCompanyContactName, updateCompanyContactFamilyName, selectedContact],
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
                <strong>Nome</strong>
                <Input
                  name="name"
                  defaultValue={selectedContact.name}
                  placeholder={selectedContact.name}
                />
                <strong>Sobrenome</strong>
                <Input
                  defaultValue={selectedContact.family_name}
                  name="family_name"
                  placeholder={selectedContact.family_name}
                />
              </section>
              <Button type="submit">Salvar</Button>
            </EditFieldContainer>
          </Form>
        </>
      ) : (
        <FieldContainer>
          <h1>
            {selectedContact.name} {selectedContact.family_name}
          </h1>
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactNameAndFamilyName;
