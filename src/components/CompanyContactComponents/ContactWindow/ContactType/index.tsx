import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import ICompanyContactDTO from '../../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import Button from '../../../Button';
import SelectField from '../../../FormComponents/SelectField';

import { Container, FieldContainer, EditFieldContainer } from './styles';

const ContactType: React.FC = () => {
  const iconSize = 24;
  const {
    updateCompanyContactType,
    contactTypes,
    selectedContact,
  } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);
  const [defaultType, setDefaultType] = useState(contactTypes[0]);

  useEffect(() => {
    const response = contactTypes.find(
      field => field.value === selectedContact.company_contact_type,
    );
    response && setDefaultType(response);
  }, [contactTypes, selectedContact]);

  const handleSubmit = useCallback(
    (data: ICompanyContactDTO) => {
      updateCompanyContactType(selectedContact.id, data.company_contact_type);
      setEditContactField(false);
    },
    [updateCompanyContactType, selectedContact],
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
                <strong>Categoria</strong>
                <SelectField
                  isSearchable={false}
                  defaultValue={defaultType}
                  name="company_contact_type"
                  options={contactTypes}
                />
              </section>
              <Button type="submit">Salvar</Button>
            </EditFieldContainer>
          </Form>
        </>
      ) : (
        <FieldContainer>
          <strong>Categoria</strong>
          <p>{defaultType.label}</p>
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactType;
