import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import ICompanyContactDTO from '../../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../../hooks/companyEmployee';
import { useToast } from '../../../../hooks/toast';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container, FieldContainer, EditFieldContainer } from './styles';

const ContactNameAndFamilyName: React.FC = () => {
  const iconSize = 24;

  const { master } = useCompanyEmployee();
  const { addToast } = useToast();
  const {
    updateCompanyContactName,
    updateCompanyContactFamilyName,
    selectedContact,
    companyContacts,
    contactEmployee,
  } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);
  const [contact, setContact] = useState(selectedContact);

  const handleSubmit = useCallback(
    async (data: ICompanyContactDTO) => {
      const findByNameAndFamilyName = companyContacts.find(
        thisContact =>
          thisContact.name === data.name &&
          thisContact.family_name === data.family_name,
      );

      if (findByNameAndFamilyName) {
        return addToast({
          type: 'error',
          title: 'Já existe um contato com o mesmo nome e sobrenome',
          description: 'Tente adicionar um outro nome ou sobrenome',
        });
      }
      await updateCompanyContactName(data.name);
      const response = await updateCompanyContactFamilyName(data.family_name);
      setContact(response);
      return setEditContactField(false);
    },
    [
      updateCompanyContactName,
      addToast,
      companyContacts,
      updateCompanyContactFamilyName,
    ],
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
                <strong>Nome</strong>
                <Input
                  name="name"
                  defaultValue={contact.name}
                  placeholder={contact.name}
                />
                <strong>Sobrenome</strong>
                <Input
                  defaultValue={contact.family_name}
                  name="family_name"
                  placeholder={contact.family_name}
                />
              </section>
              <Button type="submit">Salvar</Button>
            </EditFieldContainer>
          </Form>
        </>
      ) : (
        <FieldContainer>
          <h1>
            {contact.name} {contact.family_name}
          </h1>
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactNameAndFamilyName;
